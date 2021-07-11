import Stats from 'stats.js';
import Scene from 'engine/standard/scene';
import { resizeCanvasToDisplaySize } from 'engine/utils/helpers';
import EditorLayer from 'engine/utils/layer/editor';
import { ILayer } from 'engine/utils/layer';
import RuntimeLayer from 'engine/utils/layer/runtime';
import { cloneDeep } from 'lodash';
import Color from 'engine/utils/color';
import EngineGlobals from './globals';

export default class Engine {
	canvas: HTMLCanvasElement;
	gl: WebGL2RenderingContext;
	stats: Stats;
	activeScene: Scene;
	frameEndTime?: number;
	startTime?: number;
	activeLayer: ILayer;
	editorLayer: EditorLayer;
	runtimeLayer: RuntimeLayer;
	isRunning: boolean = false;

	global: {
		deltaTime?: number;
	};

	constructor(canvas: HTMLCanvasElement) {
		const gl = canvas.getContext('webgl2');
		this.global = {};

		const globals = new EngineGlobals(gl, canvas);

		this.editorLayer = new EditorLayer();
		this.runtimeLayer = new RuntimeLayer();
		this.activeLayer = this.editorLayer;
	}

	cleanup() {
		EngineGlobals.cleanup();
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

		EngineGlobals.gl.clearColor(
			...new Color('#000000').toNormalizedVec3(),
			1.0
		);

		this.startTime = Date.now();
		requestAnimationFrame(this.draw.bind(this));
	}

	setActiveScene(scene: Scene) {
		this.activeScene = scene;
		this.editorLayer.scene = scene;
	}

	toggleRunning() {
		if (!this.isRunning) {
			this.runtimeLayer.scene = cloneDeep(this.activeScene);
			this.activeLayer = this.runtimeLayer;
			this.runtimeLayer.setCamera();
		} else {
			this.activeLayer = this.editorLayer;
		}

		this.isRunning = !this.isRunning;
	}

	draw(now: number) {
		if (!this.activeScene) {
			return;
		}

		EngineGlobals.gl.clear(
			EngineGlobals.gl.COLOR_BUFFER_BIT | EngineGlobals.gl.DEPTH_BUFFER_BIT
		);

		if (!this.frameEndTime) {
			this.frameEndTime = now;
		}

		this.global.deltaTime = (now - this.frameEndTime) / 1000;

		if (this.global.deltaTime > 0.1) {
			this.global.deltaTime = 0;
		}

		this.stats.begin();

		this.activeLayer.draw();
		this.activeLayer.run();

		this.stats.end();
		requestAnimationFrame(this.draw.bind(this));
		this.frameEndTime = now;
	}
}
