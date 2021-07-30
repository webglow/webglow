import GeometryPool from './utils/geometry-pool';

let instance: EngineGlobals = null;

class EngineGlobals {
	gl: WebGL2RenderingContext;
	canvas: HTMLCanvasElement;
	geometryPool: GeometryPool;

	constructor(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement) {
		if (!instance) {
			instance = this;
		}

		this.gl = gl;
		this.canvas = canvas;
		this.geometryPool = new GeometryPool();

		return instance;
	}

	static cleanup() {
		instance = null;
	}

	static getInstance() {
		return instance;
	}

	static get gl() {
		return instance.gl;
	}

	static get canvas() {
		return instance.canvas;
	}

	static get geometryPool() {
		return instance.geometryPool;
	}
}

export default EngineGlobals;
