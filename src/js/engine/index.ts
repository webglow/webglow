import Stats from 'stats.js';
import Scene from 'engine/standard/scene';
import { resizeCanvasToDisplaySize } from 'engine/utils/helpers';
import EngineGlobals from './globals';

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
		const gl = canvas.getContext('webgl2');
		this.global = {};

		const globals = new EngineGlobals(gl, canvas);
	}

	async setupGl() {
		resizeCanvasToDisplaySize(EngineGlobals.canvas, 4);
		EngineGlobals.gl.enable(EngineGlobals.gl.DEPTH_TEST);
		EngineGlobals.gl.enable(EngineGlobals.gl.BLEND);
		EngineGlobals.gl.blendFunc(
			EngineGlobals.gl.SRC_ALPHA,
			EngineGlobals.gl.ONE_MINUS_SRC_ALPHA
		);
		EngineGlobals.gl.enable(EngineGlobals.gl.CULL_FACE);

		EngineGlobals.gl.viewport(
			0,
			0,
			EngineGlobals.canvas.width,
			EngineGlobals.canvas.height
		);
	}

	async start() {
		await this.setupGl();

		this.stats = new Stats();
		this.stats.showPanel(0);
		// document.body.appendChild(this.stats.dom);

		this.startTime = Date.now();
		requestAnimationFrame(this.draw.bind(this));
	}

	setActiveScene(scene: Scene) {
		this.activeScene = scene;
	}

	draw(now: number) {
		if (!this.activeScene) {
			return;
		}

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