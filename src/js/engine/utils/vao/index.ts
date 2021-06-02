import EngineGlobals from 'engine/globals';

export default class VAO {
	attribLocations: { [key: string]: number };
	buffers: { [key: string]: WebGLBuffer };
	attributes: { [key: string]: number };
	vao: WebGLVertexArrayObject;

	constructor(attribLocations: { [key: string]: number }) {
		this.attribLocations = attribLocations;
		this.buffers = {};
		this.attributes = {};
		this.vao = EngineGlobals.gl.createVertexArray();
	}

	setAttribute(name: string, length: number, type: number) {
		EngineGlobals.gl.bindVertexArray(this.vao);

		this.buffers[name] = EngineGlobals.gl.createBuffer();
		EngineGlobals.gl.bindBuffer(
			EngineGlobals.gl.ARRAY_BUFFER,
			this.buffers[name]
		);

		this.attributes[name] = this.attribLocations[name];

		EngineGlobals.gl.vertexAttribPointer(
			this.attributes[name],
			length,
			type,
			false,
			0,
			0
		);
		EngineGlobals.gl.enableVertexAttribArray(this.attributes[name]);
	}

	setBufferData(name: string, data: Float32Array) {
		EngineGlobals.gl.bindBuffer(
			EngineGlobals.gl.ARRAY_BUFFER,
			this.buffers[name]
		);
		EngineGlobals.gl.bufferData(
			EngineGlobals.gl.ARRAY_BUFFER,
			data,
			EngineGlobals.gl.STATIC_DRAW
		);
	}

	bind() {
		EngineGlobals.gl.bindVertexArray(this.vao);
	}
}
