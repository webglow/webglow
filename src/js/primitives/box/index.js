import { vec3, mat4 } from 'gl-matrix';
import vertexSource from './shaders/vertex.glsl';
import fragmentSource from './shaders/fragment.glsl';
import GameObject from '../../standard/game-object';
import { getSegment } from '../helpers';

export default class Box extends GameObject {
	constructor(gl, size = [1, 1, 1], colors) {
		super(gl);

		this.colors = colors;

		mat4.scale(this.mScale, this.mScale, vec3.fromValues(...size));

		this.setup();
	}

	setup() {
		super.setupProgram();

		this.aPositions = new Float32Array(this.getVertices());

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			this.aPositions,
			this.gl.STATIC_DRAW
		);

		this.aColors = new Float32Array(this.aPositions.length);

		for (let i = 0; i < this.aColors.length; i++) {
			this.aColors[i] = this.colors[parseInt(i / 18)][i % 3];
		}

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.color);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.aColors, this.gl.STATIC_DRAW);
	}

	createProgram() {
		super.createProgram(vertexSource, fragmentSource);
	}

	draw() {
		super.draw();

		this.updateMatrix();

		this.gl.drawArrays(this.gl.TRIANGLES, 0, this.aPositions.length / 3);
	}

	// prettier-ignore
	/* eslint-disable array-bracket-spacing */
	/* eslint-disable no-multi-spaces */
	getVertices() {
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
			...getSegment(p000, p001, p101, p100),

			// front
			...getSegment(p001, p011, p111, p101),

			// top
			...getSegment(p111, p011, p010, p110),

			// left
			...getSegment(p010, p011, p001, p000),

			// right
			...getSegment(p111, p110, p100, p101),

			// back
			...getSegment(p010, p000, p100, p110),
		];
	}
	/* eslint-enable array-bracket-spacing */
	/* eslint-enable no-multi-spaces */
}
