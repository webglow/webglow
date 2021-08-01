import GeometryPool from './utils/geometry-pool';
import MaterialPool from './utils/material-pool';
import ProjectHierarchy from './utils/project-hierarchy';
import ShaderPool from './utils/shader-pool';

let instance: EngineGlobals = null;

class EngineGlobals {
	gl: WebGL2RenderingContext;
	projectHierarchy: ProjectHierarchy;
	canvas: HTMLCanvasElement;
	geometryPool: GeometryPool;
	materialPool: MaterialPool;
	shaderPool: ShaderPool;

	constructor(gl: WebGL2RenderingContext, canvas: HTMLCanvasElement) {
		if (!instance) {
			instance = this;
		}

		this.gl = gl;
		this.canvas = canvas;
		this.geometryPool = new GeometryPool();
		this.shaderPool = new ShaderPool();
		this.materialPool = new MaterialPool();

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

	static get materialPool() {
		return instance.materialPool;
	}

	static get shaderPool() {
		return instance.shaderPool;
	}
}

export default EngineGlobals;
