let instance: EngineGlobals = null;

class EngineGlobals {
	gl: WebGL2RenderingContext;
	canvas: HTMLCanvasElement;

	constructor(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement) {
		if (!instance) {
			instance = this;
		}

		this.gl = gl;
		this.canvas = canvas;

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
}

export default EngineGlobals;
