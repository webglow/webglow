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
		gap = 0,
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
		this.color = color;

		this.setup();
	}

	setup() {
		super.setupProgram();

		this.aPositions = new Float32Array(this.getVertices());

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			this.aPositions,
			this.gl.STATIC_DRAW
		);

		this.aColors = new Float32Array(this.aPositions.length);

		for (let i = 0; i < this.aColors.length; i++) {
			this.aColors[i] = this.color[i % 3];
		}

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorsBuffer);
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

	getSegment(a, b, c, d) {
		return [...a, ...d, ...c, ...a, ...c, ...b];
	}

	getVertices() {
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
						]
					)
				);
			}
		}

		return vertices.flat();
	}

	updateMatrix() {
		this.gl.useProgram(this.program);

		const uMatrix = mat4.create();
		const mViewProjection = mat4.create();
		mat4.multiply(
			mViewProjection,
			this.mProjection,
			window.global.camera.viewMatrix
		);
		mat4.multiply(uMatrix, uMatrix, mViewProjection);
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
