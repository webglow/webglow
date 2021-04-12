import { createShader, createProgram } from '../helpers';

export default class GLProgram {
	constructor(gl) {
		/** @type {WebGL2RenderingContext} */
		this.gl = gl;
		this.attributes = {};
		this.uniforms = {};
	}

	setupProgram() {
		this.createProgram();
		this.setupAttributes();
		this.setupUniforms();
	}

	createProgram(vertexSource, fragmentSource) {
		const vertexShader = createShader(
			this.gl,
			this.gl.VERTEX_SHADER,
			vertexSource
		);
		const fragmentShader = createShader(
			this.gl,
			this.gl.FRAGMENT_SHADER,
			fragmentSource
		);

		this.program = createProgram(this.gl, vertexShader, fragmentShader);
		this.gl.useProgram(this.program);
	}

	setupAttributes() {
		this.vao = this.gl.createVertexArray();
		this.gl.bindVertexArray(this.vao);
	}

	setupUniforms() {}

	draw() {
		this.gl.useProgram(this.program);
		this.gl.bindVertexArray(this.vao);
	}
}
