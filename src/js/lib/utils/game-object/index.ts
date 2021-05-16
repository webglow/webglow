import { mat4, vec3 } from 'gl-matrix';
import BoxCollider from '../../3d/physics/collider/box-collider';
import RigidBody from '../../3d/physics/rigidbody';
import Box from '../../3d/primitives/box';
import Transform from '../../3d/standard/transform';
import { GameObjectParams } from './types';
import Mesh from '../../3d/standard/mesh';
import Collider from '../../3d/physics/collider';
import Script from '../script';
import Material from '../material';
import Light from '../../3d/standard/light';
import { LightConfig } from '../../3d/standard/light/types';
import { SphereConfig } from '../../3d/primitives/sphere/types';
import Sphere from '../../3d/primitives/sphere';
import Plane from '../../3d/primitives/plane';
import { PlaneConfig } from '../../3d/primitives/plane/types';
import { BoxConfig } from '../../3d/primitives/box/types';
import defaultShader from '../shader';

export default class GameObject {
	gl: WebGL2RenderingContext;
	transform: Transform;
	scripts: Script[];
	mesh: Mesh;
	light: Light;
	rigidBody: RigidBody;
	collider: Collider;
	material: Material;

	isRoot: boolean;
	id: string;
	parent: GameObject;
	children: GameObject[];

	constructor({
		gl,
		TransformType = Transform,
		isRoot = false,
	}: GameObjectParams = {}) {
		this.gl = gl;
		this.transform = new TransformType(this);

		this.scripts = [];
		this.isRoot = isRoot;
		this.children = [];
	}

	addMesh(MeshType: typeof Sphere, config: SphereConfig): void;
	addMesh(MeshType: typeof Plane, config: PlaneConfig): void;
	addMesh(MeshType: typeof Box, config: BoxConfig): void;
	addMesh(
		MeshType: typeof Box | typeof Sphere | typeof Plane,
		config: BoxConfig & SphereConfig & PlaneConfig
	) {
		this.mesh = new MeshType(this.gl, this, config);
	}

	addMaterial(shader = defaultShader) {
		this.material = new Material(
			this.gl,
			this,
			this.mesh.attribLocations,
			shader
		);
	}

	addScript(script: Script) {
		this.scripts.push(script);
	}

	addLight(config: LightConfig) {
		this.light = new Light(this, config);
	}

	addRigidBody(config = {}) {
		this.rigidBody = new RigidBody(this, config);

		this.children.forEach((gameObject) => {
			if (gameObject && gameObject.mesh && !gameObject.collider) {
				gameObject.addCollider(BoxCollider);
			}
		});
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
