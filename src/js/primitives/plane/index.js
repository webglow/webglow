import { mat4, vec3 } from 'gl-matrix';
import { getSegment } from '../helpers';
import Primitive from '../primitive';

export default class Plane extends Primitive {
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

		const { vertices, normals } = this.getVertices();

		this.aPositions = new Float32Array(vertices);
		this.aNormals = new Float32Array(normals);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			this.aPositions,
			this.gl.STATIC_DRAW
		);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.normal);
		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			this.aNormals,
			this.gl.STATIC_DRAW
		);

		this.aColors = new Float32Array(this.aPositions.length);

		for (let i = 0; i < this.aColors.length; i++) {
			this.aColors[i] = this.color[i % 3];
		}

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.color);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.aColors, this.gl.STATIC_DRAW);
	}

	draw() {
		super.draw();

		this.updateMatrix();

		this.gl.drawArrays(this.gl.TRIANGLES, 0, this.aPositions.length / 3);
	}

	getNormalsForSegment(p00, p01, p10) {
		const n = vec3.normalize(
			vec3.create(),
			vec3.cross(
				vec3.create(),
				vec3.subtract(vec3.create(), p01, p00),
				vec3.subtract(vec3.create(), p10, p00)
			)
		);
		return [...n, ...n, ...n, ...n, ...n, ...n];
	}

	getVertices() {
		const vertices = [];
		const normals = [];
		const segmentWidth = this.width / this.widthSegments;
		const segmentLength = this.length / this.lengthSegments;

		for (let i = 0; i < this.widthSegments; i++) {
			for (let j = 0; j < this.lengthSegments; j++) {
				const p00 = [
					i * segmentWidth + this.gap,
					this.heightMap[j * this.widthSegments + i],
					j * segmentLength + this.gap,
				];
				const p10 = [
					(i + 1) * segmentWidth - this.gap,
					this.heightMap[j * this.widthSegments + (i + 1)],
					j * segmentLength + this.gap,
				];
				const p11 = [
					(i + 1) * segmentWidth - this.gap,
					this.heightMap[(j + 1) * this.widthSegments + (i + 1)],
					(j + 1) * segmentLength - this.gap,
				];
				const p01 = [
					i * segmentWidth + this.gap,
					this.heightMap[(j + 1) * this.widthSegments + i],
					(j + 1) * segmentLength - this.gap,
				];
				vertices.push(getSegment(p00, p10, p11, p01));

				normals.push(this.getNormalsForSegment(p00, p01, p10));
			}
		}

		return {
			vertices: vertices.flat(),
			normals: normals.flat(),
		};
	}

	updateMatrix() {
		this.gl.useProgram(this.program);
		const uWorldMatrix = this.updateWorldMatrix();

		const uWorldViewProjection = mat4.create();
		const mViewProjection = mat4.create();
		mat4.multiply(
			mViewProjection,
			window.global.camera.mProjection,
			window.global.camera.viewMatrix
		);
		mat4.multiply(uWorldViewProjection, uWorldViewProjection, mViewProjection);
		mat4.multiply(uWorldViewProjection, uWorldViewProjection, uWorldMatrix);
		mat4.multiply(
			uWorldViewProjection,
			uWorldViewProjection,
			mat4.translate(mat4.create(), mat4.create(), [
				-this.width / 2,
				0,
				-this.length / 2,
			])
		);

		this.gl.uniformMatrix4fv(
			this.uniforms.worldViewProjection,
			false,
			uWorldViewProjection
		);
	}
}
