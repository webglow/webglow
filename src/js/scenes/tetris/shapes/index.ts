import Box from 'engine/primitives/box';
import { IBoxConfig } from 'engine/primitives/box/types';
import GameObject from 'engine/utils/game-object';
import { vec3 } from 'gl-matrix';

export default class Shape {
	velocity: vec3;
	parent: GameObject;
	b1: GameObject;
	b2: GameObject;
	b3: GameObject;
	b4: GameObject;

	constructor(size = 1) {
		this.setupStructure(size);

		this.velocity = [0, 0, 0];
	}

	setupStructure(size: number) {
		this.parent = new GameObject();

		this.b1 = new GameObject();
		this.b2 = new GameObject();
		this.b3 = new GameObject();
		this.b4 = new GameObject();
		this.b1.addMesh(Box, {
			size: [size, size, size],
		} as IBoxConfig);
		this.b2.addMesh(Box, {
			size: [size, size, size],
		} as IBoxConfig);
		this.b3.addMesh(Box, {
			size: [size, size, size],
		} as IBoxConfig);
		this.b4.addMesh(Box, {
			size: [size, size, size],
		} as IBoxConfig);

		this.b1.addMaterial();
		this.b2.addMaterial();
		this.b3.addMaterial();
		this.b4.addMaterial();

		this.b1.setParent(this.parent);
		this.b2.setParent(this.parent);
		this.b3.setParent(this.parent);
		this.b4.setParent(this.parent);

		// this.parent.addRigidBody();
	}

	setVelocity(velocity: vec3) {
		this.velocity = velocity;
	}

	move() {
		this.parent.rigidBody.addForce(this.velocity);
	}
}
