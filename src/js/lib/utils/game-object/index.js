import { vec3 } from 'gl-matrix';
import BoxCollider from '../../3d/physics/collider/box-collider';
import RigidBody from '../../3d/physics/rigidbody';
import Box from '../../3d/primitives/box';
import HierarchyNode from '../hierarchy/node';
import Transform from '../../3d/standard/transform';

export default class GameObject {
	constructor({ gl, scene, TransformType = Transform } = {}) {
		this.gl = gl;
		this.transform = new TransformType();
		this.node = new HierarchyNode(this, false, null);
		this.scene = scene;
	}

	addMesh(MeshType, config) {
		this.mesh = new MeshType(this.gl, this, config);
	}

	addLight(LightType, config) {
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
				window.a = node.gameObject.collider;
			}
		});
	}

	addCollider(ColliderType, config) {
		if (!config) {
			if (ColliderType === BoxCollider && this.mesh instanceof Box) {
				config = {
					min: vec3.negate(
						vec3.create(),
						vec3.scale(vec3.create(), this.mesh.size, 0.5)
					),
					max: vec3.scale(vec3.create(), this.mesh.size, 0.5),
				};
			}
		}
		this.collider = new ColliderType(this, config);
	}
}
