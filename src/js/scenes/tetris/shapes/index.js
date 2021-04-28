import Box from '../../../lib/primitives/box';
import GameObject from '../../../lib/standard/game-object';

export default class Shape {
	constructor(gl, scene, color, size = 500) {
		this.setupStructure(gl, scene, color, size);

		this.velocity = [0, 0, 0];
	}

	setupStructure(gl, scene, color, size) {
		this.parent = new GameObject();

		this.b1 = new GameObject({ gl, scene });
		this.b2 = new GameObject({ gl, scene });
		this.b3 = new GameObject({ gl, scene });
		this.b4 = new GameObject({ gl, scene });
		this.b1.addMesh(Box, {
			size: [size, size, size],
			color,
			enableSpecular: true,
			specularStrength: 50,
		});
		this.b2.addMesh(Box, {
			size: [size, size, size],
			color,
			enableSpecular: true,
			specularStrength: 50,
		});
		this.b3.addMesh(Box, {
			size: [size, size, size],
			color,
			enableSpecular: true,
			specularStrength: 50,
		});
		this.b4.addMesh(Box, {
			size: [size, size, size],
			color,
			enableSpecular: true,
			specularStrength: 50,
		});

		this.b1.node.addParent(this.parent.node);
		this.b2.node.addParent(this.parent.node);
		this.b3.node.addParent(this.parent.node);
		this.b4.node.addParent(this.parent.node);

		this.parent.addRigidBody();
	}

	setVelocity(velocity) {
		this.velocity = velocity;
	}

	move() {
		this.parent.rigidBody.addForce(this.velocity);
	}
}
