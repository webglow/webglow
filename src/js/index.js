import Stats from 'stats.js';
import { vec3 } from 'gl-matrix';
import { resizeCanvasToDisplaySize, hexToRgb } from './helpers';
import Box from './box';
import Plane from './plane';
import Sphere from './sphere';

class Game {
	constructor() {
		this.canvas = document.querySelector('#canvas');

		/** @type {WebGL2RenderingContext} */
		this.gl = this.canvas.getContext('webgl2');
		this.global = {};
		window.global = this.global;
	}

	async setupGl() {
		resizeCanvasToDisplaySize(this.gl.canvas, 2);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.enable(this.gl.CULL_FACE);

		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	}

	async start() {
		await this.setupGl();

		this.stats = new Stats();
		this.stats.showPanel(0);
		document.body.appendChild(this.stats.dom);

		this.cube = new Box(
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
		this.plane = new Plane(
			this.gl,
			10000,
			10000,
			2,
			2,
			hexToRgb('#9b59b6').vec3,
			1
		);
		this.sphere = new Sphere(
			this.gl,
			100,
			100,
			700,
			hexToRgb('#e67e22').vec3,
			0.1
		);

		// this.sphere.rotate(Math.PI / 2, [1, 0, 0]);

		this.cube.translate([0, 0, -1500]);
		this.plane.translate([0, -1000, -1500]);
		this.sphere.translate([0, 0, -1500]);

		const backgroundColorRgb = hexToRgb('#000000');
		this.gl.clearColor(
			backgroundColorRgb.r,
			backgroundColorRgb.g,
			backgroundColorRgb.b,
			1.0
		);

		this.startTime = Date.now();
		requestAnimationFrame(this.draw.bind(this));
	}

	draw(now) {
		if (!this.frameEndTime) {
			this.frameEndTime = now;
		}

		this.global.deltaTime = (now - this.frameEndTime) / 1000;

		if (this.global.deltaTime > 0.1) {
			this.global.deltaTime = 0;
		}

		this.stats.begin();
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this.cube.rotate(0.01, vec3.fromValues(1, 0, 0));
		this.cube.rotate(0.03, vec3.fromValues(0, 1, 0));
		this.plane.rotate(0.001, vec3.fromValues(0, 1, 0));
		this.sphere.rotate(0.005, vec3.fromValues(1, 1, 1));

		this.plane.draw();

		this.cube.draw();

		this.sphere.draw();

		this.stats.end();
		requestAnimationFrame(this.draw.bind(this));
		this.frameEndTime = now;
	}
}

const game = new Game();
game.start();
