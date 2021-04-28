import { createShader, createProgram } from '../../helpers';

export default class GLProgram {
	constructor(gl, vertexSource, fragmentSource, attribLocations) {
		/** @type {WebGL2RenderingContext} */
		this.gl = gl;
		this.attributes = {};
		this.uniforms = {};
		this.buffers = {};
		this.program = this.createProgram(
			vertexSource,
			fragmentSource,
			attribLocations
		);
		this.vao = this.gl.createVertexArray();
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

	setAttribute(name, length, type) {
		this.gl.bindVertexArray(this.vao);

		this.buffers[name] = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers[name]);

		this.attributes[name] = this.gl.getAttribLocation(this.program, name);

		this.gl.vertexAttribPointer(
			this.attributes[name],
			length,
			type,
			false,
			0,
			0
		);
		this.gl.enableVertexAttribArray(this.attributes[name]);
	}

	setBufferData(name, data) {
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers[name]);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);
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
