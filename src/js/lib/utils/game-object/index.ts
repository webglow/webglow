import { vec3 } from 'gl-matrix';
import BoxCollider from '../../3d/physics/collider/box-collider';
import RigidBody from '../../3d/physics/rigidbody';
import Box from '../../3d/primitives/box';
import Transform from '../../3d/standard/transform';
import Transform2D from '../../2d/standard/transform';
import { GameObjectParams } from './types';
import Mesh from '../../3d/standard/mesh';
import PointLight from '../../3d/standard/light/point';
import DirectionalLight from '../../3d/standard/light/directional';
import Collider from '../../3d/physics/collider';
import Script from '../script';
import { PointLightConfig } from '../../3d/standard/light/point/types';
import { DirectionalLightConfig } from '../../3d/standard/light/directional/types';

export default class GameObject {
	gl: WebGL2RenderingContext;
	transform: Transform;
	scripts: Script[];
	mesh: Mesh;
	light: PointLight | DirectionalLight;
	rigidBody: RigidBody;
	collider: Collider;

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

	addMesh(MeshType: typeof Mesh, config: any) {
		this.mesh = new MeshType(this.gl, this, config);
	}

	addScript(script: Script) {
		this.scripts.push(script);
	}

	addLight(LightType: typeof PointLight, config: PointLightConfig): void;
	addLight(LightType: typeof DirectionalLight, config: DirectionalLightConfig) {
		this.light = new LightType(this, config);
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
}
