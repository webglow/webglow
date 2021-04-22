import Box from '../../../lib/primitives/box';
import GameObject from '../../../lib/standard/game-object';

export default class Shape {
	constructor(gl, scene, color, size = 500) {
		this.setupStructure(gl, scene, color, size);

		this.speed = 10;
	}

	setupStructure(gl, scene, color, size) {
		this.parent = new GameObject();

		this.b1 = new Box(gl, scene, {
			size: [size, size, size],
			color,
			enableSpecular: true,
			specularStrength: 50,
		});
		this.b2 = new Box(gl, scene, {
			size: [size, size, size],
			color,
			enableSpecular: true,
			specularStrength: 50,
		});
		this.b3 = new Box(gl, scene, {
			size: [size, size, size],
			color,
			enableSpecular: true,
			specularStrength: 50,
		});
		this.b4 = new Box(gl, scene, {
			size: [size, size, size],
			color,
			enableSpecular: true,
			specularStrength: 50,
		});

		this.b1.node.addParent(this.parent.node);
		this.b2.node.addParent(this.parent.node);
		this.b3.node.addParent(this.parent.node);
		this.b4.node.addParent(this.parent.node);
	}

	move() {
		this.parent.transform.translate([0, -this.speed, 0]);
		if (this.parent.transform.vPosition[1] < 0) {
			this.speed = 0;
		}
	}
}
