import { vec3 } from 'gl-matrix';
import Box from '../../../../lib/3d/primitives/box';
import Scene from '../../../../lib/3d/standard/scene';
import Color from '../../../../lib/utils/color';
import GameObject from '../../../../lib/utils/game-object';

export default class Shape {
	velocity: vec3;
	parent: GameObject;
	b1: GameObject;
	b2: GameObject;
	b3: GameObject;
	b4: GameObject;

	constructor(
		gl: WebGL2RenderingContext,
		scene: Scene,
		color: Color,
		size = 500
	) {
		this.setupStructure(gl, scene, color, size);

		this.velocity = [0, 0, 0];
	}

	setupStructure(
		gl: WebGL2RenderingContext,
		scene: Scene,
		color: Color,
		size: number
	) {
		this.parent = new GameObject({ gl });

		this.b1 = new GameObject({ gl });
		this.b2 = new GameObject({ gl });
		this.b3 = new GameObject({ gl });
		this.b4 = new GameObject({ gl });
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
