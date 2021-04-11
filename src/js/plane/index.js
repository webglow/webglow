import { mat4 } from 'gl-matrix';
import GameObject from '../game-object';
import vertexSource from './shaders/vertex.glsl';
import fragmentSource from './shaders/fragment.glsl';

export default class Plane extends GameObject {
	constructor(
		gl,
		width,
		length,
		widthSegments,
		lengthSegments,
		color = [1, 1, 1],
		gap = 0.1,
		heightMap
	) {
		super(gl);

		this.heightMap =
			heightMap ||
			new Array((widthSegments + 1) * (lengthSegments + 1)).fill(0);

		this.width = width;
		this.length = length;
		this.widthSegments = widthSegments;
		this.lengthSegments = lengthSegments;
		this.gap = gap;

		this.rawData = new Float32Array(this.getVertices(color));

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

	getVertices(color) {
		const vertices = [];
		const segmentWidth = this.width / this.widthSegments;
		const segmentLength = this.length / this.lengthSegments;

		for (let i = 0; i < this.widthSegments; i++) {
			for (let j = 0; j < this.lengthSegments; j++) {
				vertices.push(
					this.getSegment(
						[
							i * segmentWidth + this.gap,
							this.heightMap[j * this.widthSegments + i],
							j * segmentLength + this.gap,
						],
						[
							(i + 1) * segmentWidth - this.gap,
							this.heightMap[j * this.widthSegments + (i + 1)],
							j * segmentLength + this.gap,
						],
						[
							(i + 1) * segmentWidth - this.gap,
							this.heightMap[(j + 1) * this.widthSegments + (i + 1)],
							(j + 1) * segmentLength - this.gap,
						],
						[
							i * segmentWidth + this.gap,
							this.heightMap[(j + 1) * this.widthSegments + i],
							(j + 1) * segmentLength - this.gap,
						],
						color
					)
				);
			}
		}

		return vertices.flat();
	}

	updateMatrix() {
		this.gl.useProgram(this.program);

		const uMatrix = mat4.create();
		mat4.multiply(uMatrix, uMatrix, this.mProjection);
		mat4.multiply(uMatrix, uMatrix, this.mTranslation);
		mat4.multiply(uMatrix, uMatrix, this.mRotation);
		mat4.multiply(uMatrix, uMatrix, this.mScale);
		mat4.multiply(
			uMatrix,
			uMatrix,
			mat4.translate(mat4.create(), mat4.create(), [
				-this.width / 2,
				0,
				-this.length / 2,
			])
		);

		this.gl.uniformMatrix4fv(this.uniforms.matrixLocation, false, uMatrix);
	}
}
