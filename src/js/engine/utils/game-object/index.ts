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
import Transform from 'engine/standard/transform';
import Material from 'engine/utils/material';
import Script from 'engine/utils/script';
import Behaviour from 'engine/utils/script/behaviour';
import defaultShader from 'engine/utils/shader';
import { mat4, vec3 } from 'gl-matrix';
import { IGameObjectParams } from './types';

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

	toJSON() {
		return {
			transform: this.transform,
			scripts: this.scripts,
			mesh: this.mesh,
			material: this.material,
			camera: this.camera,
			id: this.id,
			children: this.children,
		};
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
