import { vec3 } from 'gl-matrix';
import Box from './primitives/box';
import { hexToRgb } from './helpers';
import Plane from './primitives/plane';
import Scene from './standard/scene';
import SkyBox from './standard/skybox';
import Sphere from './primitives/sphere';

export default class MainScene extends Scene {
	constructor(gl) {
		super(gl);

		this.setup();
	}

	setup() {
		const cube = new Box(
			this.gl,
			[200, 200, 200],
			[
				hexToRgb('#ffcc00').vec3,
				hexToRgb('#e74c3c').vec3,
				hexToRgb('#e67e22').vec3,
				hexToRgb('#27ae60').vec3,
				hexToRgb('#2980b9').vec3,
				hexToRgb('#34495e').vec3,
			]
		);
		const plane = new Plane(
			this.gl,
			50000,
			50000,
			2,
			2,
			hexToRgb('#cd6133').vec3
		);
		const sphere = new Sphere(
			this.gl,
			100,
			100,
			1000,
			hexToRgb('#e67e22').vec3,
			0,
			false
		);

		const skyBox = new SkyBox(
			this.gl,
			10,
			10,
			50000,
			hexToRgb('#48dbfb').vec3,
			hexToRgb('#576574').vec3
		);

		cube.translate([0, 2000, 0]);
		plane.translate([0, -1000, 0]);

		this.addObject('cube', cube);
		this.addObject('sphere', sphere);
		this.addObject('plane', plane);
		this.addObject('skyBox', skyBox);
	}

	draw() {
		const cube = this.getObject('cube');
		const plane = this.getObject('plane');
		const sphere = this.getObject('sphere');
		const skyBox = this.getObject('skyBox');

		cube.rotate(0.01, vec3.fromValues(1, 0, 0));
		cube.rotate(0.03, vec3.fromValues(0, 1, 0));
		plane.rotate(0.001, vec3.fromValues(0, 1, 0));

		sphere.rotate(0.001, vec3.fromValues(1, 1, 0));

		skyBox.setPosition(window.global.camera.vPosition);

		super.draw();
	}
}
