import { createShader, createProgram } from '../helpers';

export default class Material {
	constructor(gl, vertexSource, fragmentSource, attribLocations) {
		/** @type {WebGL2RenderingContext} */
		this.gl = gl;
		this.attributes = {};
		this.uniforms = {};
		this.program = this.createProgram(
			vertexSource,
			fragmentSource,
			attribLocations
		);
	}

	createProgram(vertexSource, fragmentSource, attribLocations) {
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

		return createProgram(
			this.gl,
			vertexShader,
			fragmentShader,
			attribLocations
		);
	}

	setUniforms(uniforms) {
		this.gl.useProgram(this.program);

		Object.keys(uniforms).forEach((uniformName) => {
			const uniformLocation = this.gl.getUniformLocation(
				this.program,
				uniformName
			);

			this.gl[uniforms[uniformName].type](
				uniformLocation,
				...uniforms[uniformName].value
			);
		});
	}
}
