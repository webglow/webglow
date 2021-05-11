import { vec3 } from 'gl-matrix';
import BoxCollider from '../../3d/physics/collider/box-collider';
import RigidBody from '../../3d/physics/rigidbody';
import Box from '../../3d/primitives/box';
import HierarchyNode from '../hierarchy/node';
import Transform from '../../3d/standard/transform';
import Transform2D from '../../2d/standard/transform';
import Scene from '../../3d/standard/scene';
import { GameObjectParams } from './types';
import Mesh from '../../3d/standard/mesh';
import PointLight from '../../3d/standard/light/point';
import DirectionalLight from '../../3d/standard/light/directional';
import Collider from '../../3d/physics/collider';
import Script from '../script';

export default class GameObject {
	gl: WebGL2RenderingContext;
	transform: Transform;
	node: HierarchyNode;
	scene: Scene;
	scripts: Script[];
	mesh: Mesh;
	light: PointLight | DirectionalLight;
	rigidBody: RigidBody;
	collider: Collider;

	constructor({ gl, scene, TransformType = Transform }: GameObjectParams) {
		this.gl = gl;
		this.node = new HierarchyNode(this, false, null);
		this.transform = new TransformType(this.node);
		this.scene = scene;
		this.scripts = [];
	}

	addMesh(MeshType: typeof Mesh, config: any) {
		this.mesh = new MeshType(this.gl, this, config);
	}

	addScript(script: Script) {
		this.scripts.push(script);
	}

	addLight(
		LightType: typeof PointLight | typeof DirectionalLight,
		config: any
	) {
		this.light = new LightType(this, config);
	}

	addRigidBody(config = {}) {
		this.rigidBody = new RigidBody(this, config);

		this.node.children.forEach((node) => {
			if (
				node.gameObject &&
				node.gameObject.mesh &&
				!node.gameObject.collider
			) {
				node.gameObject.addCollider(BoxCollider);
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
}
