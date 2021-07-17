import Collider from 'engine/physics/collider';
import BoxCollider from 'engine/physics/collider/box-collider';
import RigidBody from 'engine/physics/rigidbody';
import Box from 'engine/primitives/box';
import { IBoxConfig } from 'engine/primitives/box/types';
import Plane from 'engine/primitives/plane';
import { IPlaneConfig } from 'engine/primitives/plane/types';
import Sphere from 'engine/primitives/sphere';
import { ISphereConfig } from 'engine/primitives/sphere/types';
import Camera from 'engine/standard/camera';
import Light from 'engine/standard/light';
import { ILightConfig } from 'engine/standard/light/types';
import Mesh from 'engine/standard/mesh';
import { MeshType } from 'engine/standard/mesh/types';
import Transform from 'engine/standard/transform';
import Color from 'engine/utils/color';
import Material from 'engine/utils/material';
import Script from 'engine/utils/script';
import Behaviour from 'engine/utils/script/behaviour';
import defaultShader from 'engine/utils/shader';
import { mat4, vec3 } from 'gl-matrix';
import { IGameObjectJSON, IGameObjectParams } from './types';

export default class GameObject {
	transform: Transform;
	scripts: Script[];
	mesh: MeshType;
	light: Light;
	rigidBody: RigidBody;
	collider: Collider;
	material: Material;
	camera: Camera;
	behaviour: Behaviour[];

	isRoot: boolean;
	id: string;
	parent: GameObject;
	children: GameObject[];

	constructor({
		TransformType = Transform,
		isRoot = false,
	}: IGameObjectParams = {}) {
		this.transform = new TransformType(this);

		this.scripts = [];
		this.isRoot = isRoot;
		this.children = [];
		this.behaviour = [];
	}

	toJSON(): IGameObjectJSON {
		return {
			transform: this.transform.toJSON(),
			scripts: this.scripts.map((script) => script.toJSON()),
			mesh: this.mesh?.toJSON(),
			isRoot: this.isRoot,
			material: this.material?.toJSON(),
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
		isRoot,
		material,
		light,
		camera,
		id,
		children,
	}: IGameObjectJSON): GameObject {
		const gameObject = new GameObject();
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

		if (mesh) {
			switch (mesh.type) {
				case 'Plane':
					gameObject.addMesh(Plane, mesh as IPlaneConfig);
					break;
				case 'Sphere':
					gameObject.addMesh(Sphere, mesh as ISphereConfig);
					break;
				case 'Box':
					gameObject.addMesh(Box, mesh as IBoxConfig);
					break;
				default:
					console.error('Unsupported mesh type', mesh.type);
			}
		}

		if (camera) {
			gameObject.addCamera();
		}

		if (material) {
			gameObject.addMaterial(material.shader);
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

	addMesh(MeshType: typeof Sphere, config: ISphereConfig): void;
	addMesh(MeshType: typeof Plane, config: IPlaneConfig): void;
	addMesh(MeshType: typeof Box, config: IBoxConfig): void;
	addMesh(
		_MeshType: typeof Box | typeof Sphere | typeof Plane,
		config: IBoxConfig & ISphereConfig & IPlaneConfig
	) {
		this.mesh = new _MeshType(this, config);
	}

	addMaterial(shader = defaultShader) {
		this.material = new Material(shader);

		this.material.attach(this, this.mesh.attribLocations);
	}

	addScript(script: Script) {
		this.scripts.push(script);
	}

	addLight(config: ILightConfig) {
		this.light = new Light(this, config);
	}

	addBehaviour(CustomBehaviour: typeof Behaviour) {
		this.behaviour.push(new CustomBehaviour(this));
	}

	addRigidBody(config = {}) {
		this.rigidBody = new RigidBody(this, config);

		this.children.forEach((gameObject) => {
			if (gameObject && gameObject.mesh && !gameObject.collider) {
				gameObject.addCollider(BoxCollider);
			}
		});
	}

	addCamera() {
		this.camera = new Camera(this);
	}

	addCollider(ColliderType: typeof Collider, config = {}) {
		if (!config) {
			if (ColliderType === BoxCollider && this.mesh instanceof Box) {
				config = {
					min: vec3.negate(
						vec3.create(),
						vec3.scale(vec3.create(), this.mesh.size as vec3, 0.5)
					),
					max: vec3.scale(vec3.create(), this.mesh.size as vec3, 0.5),
				};
			}
		}
		this.collider = new ColliderType(this, config);
	}

	setParent(parent: GameObject) {
		this.parent = parent;
		parent.children.push(this);
	}

	addChild(child: GameObject) {
		child.parent = this;
		this.children.push(this);
	}

	updateMatrix(mProjection: mat4, viewWorldPosition: vec3, pov: mat4) {
		const world = this.updateWorldMatrix(viewWorldPosition);

		const worldViewProjection = this.transform.getWorldViewProjection(
			world,
			mProjection,
			pov
		);

		this.material.shaderController.setWorldViewProjection(worldViewProjection);

		return worldViewProjection;
	}

	updateWorldMatrix(viewWorldPosition: vec3) {
		const world = this.transform.getWorld();

		const worldInverseTranspose = mat4.create();

		mat4.transpose(
			worldInverseTranspose,
			mat4.invert(worldInverseTranspose, world)
		);

		this.material.shaderController.setWorld(world);
		this.material.shaderController.setWorldInverseTranspose(
			worldInverseTranspose
		);
		this.material.shaderController.setViewWorldPosition(viewWorldPosition);

		return world;
	}

	draw(mProjection: mat4, viewWorldPosition: vec3, pov: mat4) {
		this.mesh.vao.bind();

		this.material.bindTexture();

		this.updateMatrix(mProjection, viewWorldPosition, pov);

		this.mesh.draw();
	}
}
