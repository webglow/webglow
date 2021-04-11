import { vec3, mat4 } from 'gl-matrix';
import vertexSource from './shaders/vertex.glsl';
import fragmentSource from './shaders/fragment.glsl';
import GameObject from '../game-object';

export default class Box extends GameObject {
	constructor(gl, size = [1, 1, 1], colors) {
		super(gl);

		mat4.scale(this.mScale, this.mScale, vec3.fromValues(...size));

		// prettier-ignore
		this.rawData = new Float32Array(this.getVertices(colors));

		this.setup();

		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.rawData, this.gl.STATIC_DRAW);
	}

	createProgram() {
		super.createProgram(vertexSource, fragmentSource);
	}

	draw() {
		super.draw();

		this.updateMatrix();

		this.gl.drawArrays(this.gl.TRIANGLES, 0, this.rawData.length / 3);
	}

	getSegment(a, b, c, d, color) {
		return [
			...a,
			...color,
			...d,
			...color,
			...c,
			...color,
			...a,
			...color,
			...c,
			...color,
			...b,
			...color,
		];
	}

	// prettier-ignore
	/* eslint-disable array-bracket-spacing */
	/* eslint-disable no-multi-spaces */
	getVertices(colors) {
		const p000 = [-1, -1, -1];
		const p100 = [ 1, -1, -1];
		const p101 = [ 1, -1,  1];
		const p001 = [-1, -1,  1];
		const p010 = [-1,  1, -1];
		const p110 = [ 1,  1, -1];
		const p111 = [ 1,  1,  1];
		const p011 = [-1,  1,  1];

		return [
			// bottom
			...this.getSegment(p000, p001, p101, p100, colors[0]),

			// front
			...this.getSegment(p001, p011, p111, p101, colors[1]),

			// top
			...this.getSegment(p111, p011, p010, p110, colors[2]),

			// left
			...this.getSegment(p010, p011, p001, p000, colors[3]),

			// right
			...this.getSegment(p111, p110, p100, p101, colors[4]),

			// back
			...this.getSegment(p010, p000, p100, p110, colors[5]),
		];
	}
	/* eslint-enable array-bracket-spacing */
	/* eslint-enable no-multi-spaces */
}
