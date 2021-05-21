import { mat4, vec3 } from 'gl-matrix';
import BoxCollider from '../../3d/physics/collider/box-collider';
import RigidBody from '../../3d/physics/rigidbody';
import Box from '../../3d/primitives/box';
import Transform from '../../3d/standard/transform';
import { IGameObjectParams } from './types';
import Mesh from '../../3d/standard/mesh';
import Collider from '../../3d/physics/collider';
import Script from '../script';
import Material from '../material';
import Light from '../../3d/standard/light';
import { ILightConfig } from '../../3d/standard/light/types';
import { ISphereConfig } from '../../3d/primitives/sphere/types';
import Sphere from '../../3d/primitives/sphere';
import Plane from '../../3d/primitives/plane';
import { IPlaneConfig } from '../../3d/primitives/plane/types';
import { IBoxConfig } from '../../3d/primitives/box/types';
import defaultShader from '../shader';
import Camera from '../../3d/standard/camera';
import Behaviour from '../script/behaviour';

export default class GameObject {
	transform: Transform;
	scripts: Script[];
	mesh: Mesh;
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

	addMesh(MeshType: typeof Sphere, config: ISphereConfig): void;
	addMesh(MeshType: typeof Plane, config: IPlaneConfig): void;
	addMesh(MeshType: typeof Box, config: IBoxConfig): void;
	addMesh(
		MeshType: typeof Box | typeof Sphere | typeof Plane,
		config: IBoxConfig & ISphereConfig & IPlaneConfig
	) {
		this.mesh = new MeshType(this, config);
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

		this.material.setWorldViewProjection(worldViewProjection);

		return worldViewProjection;
	}

	updateWorldMatrix(viewWorldPosition: vec3) {
		const world = this.transform.getWorld();

		const worldInverseTranspose = mat4.create();

		mat4.transpose(
			worldInverseTranspose,
			mat4.invert(worldInverseTranspose, world)
		);

		this.material.setWorld(world);
		this.material.setWorldInverseTranspose(worldInverseTranspose);
		this.material.setViewWorldPosition(viewWorldPosition);

		return world;
	}

	draw(mProjection: mat4, viewWorldPosition: vec3, pov: mat4) {
		this.mesh.vao.bind();

		this.material.bindTexture();

		this.updateMatrix(mProjection, viewWorldPosition, pov);

		this.mesh.draw();
	}
}
