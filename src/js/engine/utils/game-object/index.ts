import Collider from 'engine/physics/collider';
import RigidBody from 'engine/physics/rigidbody';
import Camera from 'engine/standard/camera';
import Light from 'engine/standard/light';
import { LightType } from 'engine/standard/light/types';
import Mesh from 'engine/standard/mesh';
import Transform from 'engine/standard/transform';
import Color from 'engine/utils/color';
import Script from 'engine/utils/script';
import Behaviour from 'engine/utils/script/behaviour';
import { makeAutoObservable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import Geometry from '../../standard/geometry';
import MeshRenderer from '../mesh-renderer';
import { IGameObjectJSON, IGameObjectParams } from './types';

export default class GameObject {
	transform: Transform;
	scripts: Script[];
	mesh: Mesh;
	meshRenderer: MeshRenderer;
	light: Light;
	rigidBody: RigidBody;
	collider: Collider;
	camera: Camera;
	behaviour: Behaviour[];

	isRoot: boolean;
	id: string;
	displayName: string;
	parent: GameObject;
	children: GameObject[];

	constructor({
		isRoot = false,
		displayName = 'GameObject',
	}: IGameObjectParams = {}) {
		this.transform = new Transform(this);

		this.displayName = displayName;
		this.scripts = [];
		this.isRoot = isRoot;
		this.children = [];
		this.behaviour = [];
		this.mesh = null;
		this.meshRenderer = null;
		this.light = null;
		this.camera = null;
		this.parent = null;
		this.id = uuidv4();

		makeAutoObservable(this);
	}

	toJSON(): IGameObjectJSON {
		return {
			transform: this.transform.toJSON(),
			scripts: this.scripts.map((script) => script.toJSON()),
			mesh: this.mesh?.toJSON(),
			meshRenderer: this.meshRenderer?.toJSON(),
			displayName: this.displayName,
			isRoot: this.isRoot,
			light: this.light?.toJSON(),
			camera: this.camera?.toJSON(),
			id: this.id,
			children: this.children.map((child) => child.toJSON()),
		};
	}

	static fromJSON({
		transform,
		scripts,
		mesh,
		meshRenderer,
		isRoot,
		displayName,
		light,
		camera,
		id,
		children,
	}: IGameObjectJSON): GameObject {
		const gameObject = new GameObject({ displayName });
		gameObject.isRoot = isRoot;
		gameObject.id = id;
		gameObject.transform = Transform.fromJSON(gameObject, transform);

		if (light) {
			const color = new Color(light.color);
			gameObject.addLight({
				color,
				intensity: light.intensity,
				type: light.type,
			});
		}

		if (mesh && meshRenderer) {
			gameObject.mesh = Mesh.fromJSON(mesh);
			gameObject.addMeshRenderer(
				MeshRenderer.fromJSON(gameObject, meshRenderer)
			);
		}

		if (camera) {
			gameObject.addCamera();
		}

		gameObject.scripts = scripts.map((scriptJson) => {
			const script = Script.fromJSON(scriptJson);
			script.assign(gameObject);
			return script;
		});

		gameObject.children = children.map((childJson) => {
			const child = GameObject.fromJSON(childJson);
			child.parent = gameObject;
			return child;
		});

		return gameObject;
	}

	addMesh(geometry: Geometry) {
		this.mesh = new Mesh(geometry);

		this.addMeshRenderer();
	}

	addMeshRenderer(meshRenderer: MeshRenderer = new MeshRenderer(this)) {
		this.meshRenderer = meshRenderer;
	}

	addScript(script: Script) {
		this.scripts.push(script);
	}

	addLight({
		intensity = 1,
		color = new Color('#ffffff'),
		type = LightType.Directional,
	} = {}) {
		this.light = new Light(this, { intensity, color, type });
	}

	addBehaviour(CustomBehaviour: typeof Behaviour) {
		this.behaviour.push(new CustomBehaviour(this));
	}

	// addRigidBody(config = {}) {
	// this.rigidBody = new RigidBody(this, config);

	// this.children.forEach((gameObject) => {
	// if (gameObject && gameObject.mesh && !gameObject.collider) {
	// gameObject.addCollider(BoxCollider);
	// }
	// });
	// }

	addCamera() {
		this.camera = new Camera(this);
	}

	// addCollider(ColliderType: typeof Collider, config = {}) {
	// if (!config) {
	// if (ColliderType === BoxCollider && this.mesh instanceof Box) {
	// config = {
	// min: vec3.negate(
	// vec3.create(),
	// vec3.scale(vec3.create(), this.mesh.size as vec3, 0.5)
	// ),
	// max: vec3.scale(vec3.create(), this.mesh.size as vec3, 0.5),
	// };
	// }
	// }
	// this.collider = new ColliderType(this, config);
	// }

	setParent(parent: GameObject) {
		this.parent = parent;
		parent.children.push(this);
	}

	addChild(child: GameObject) {
		child.parent = this;
		this.children.push(this);
	}

	rename(newName: string) {
		this.displayName = newName || 'GameObject';
	}
}
