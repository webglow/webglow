export default class VAO {
	constructor(gl, attribLocations) {
		this.gl = gl;
		this.attribLocations = attribLocations;
		this.buffers = {};
		this.attributes = {};
		this.vao = this.gl.createVertexArray();
	}

	setAttribute(name, length, type) {
		this.gl.bindVertexArray(this.vao);

		this.buffers[name] = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers[name]);

		this.attributes[name] = this.attribLocations[name];

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

	bind() {
		this.gl.bindVertexArray(this.vao);
	}
}
