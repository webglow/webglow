import Stats from 'stats.js';
import { resizeCanvasToDisplaySize } from './lib/utils/helpers';
import Tetris from './scenes/3d/tetris/scene';
import Color from './lib/utils/color';
import Test2DScene from './scenes/2d/test.scene';

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
		this.gl.enable(this.gl.BLEND);
		this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
		this.gl.enable(this.gl.CULL_FACE);

		this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
	}

	async start() {
		await this.setupGl();

		this.stats = new Stats();
		this.stats.showPanel(0);
		document.body.appendChild(this.stats.dom);

		this.mainScene = new Test2DScene(this.gl, {
			backgroundColor: new Color('#000000'),
		});

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

		this.mainScene.draw();

		this.stats.end();
		requestAnimationFrame(this.draw.bind(this));
		this.frameEndTime = now;
	}
}

const game = new Game();
game.start();
