import Stats from 'stats.js';
import { resizeCanvasToDisplaySize } from './lib/utils/helpers';
import Tetris from './scenes/3d/tetris/scene';
import Color from './lib/utils/color';
import Scene from './lib/3d/standard/scene';

export default class Engine {
	canvas: HTMLCanvasElement;
	gl: WebGL2RenderingContext;
	stats: Stats;
	activeScene: Scene;
	frameEndTime?: number;
	startTime?: number;
	global: {
		deltaTime?: number;
	};

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;

		this.gl = this.canvas.getContext('webgl2');
		this.global = {};
		window.global = this.global as any;
	}

	async setupGl() {
		resizeCanvasToDisplaySize(this.gl.canvas, 4);
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
		// document.body.appendChild(this.stats.dom);

		this.activeScene = new Tetris(this.gl, {
			backgroundColor: new Color('#000000'),
		});

		this.startTime = Date.now();
		requestAnimationFrame(this.draw.bind(this));
	}

	draw(now: number) {
		if (!this.frameEndTime) {
			this.frameEndTime = now;
		}

		this.global.deltaTime = (now - this.frameEndTime) / 1000;

		if (this.global.deltaTime > 0.1) {
			this.global.deltaTime = 0;
		}

		this.stats.begin();

		this.activeScene.draw();

		this.stats.end();
		requestAnimationFrame(this.draw.bind(this));
		this.frameEndTime = now;
	}
}
