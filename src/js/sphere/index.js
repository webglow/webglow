import { vec3 } from 'gl-matrix';
import GameObject from '../game-object';
import vertexSource from './shaders/vertex.glsl';
import fragmentSource from './shaders/fragment.glsl';

export default class Sphere extends GameObject {
	constructor(
		gl,
		widthSegments,
		heightSegments,
		radius,
		color = [1, 1, 1],
		gap = 0
	) {
		super(gl);

		this.widthSegments = widthSegments;
		this.heightSegments = heightSegments;
		this.radius = radius;
		this.gap = gap;
		this.color = color;

		this.setup();

		this.rawData = new Float32Array(this.getVertices(this.color));

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

	getPoint(i, j, width, height) {
		const longitude = ((i % width) / width) * 2 * Math.PI;
		const latitude = ((j % height) / height) * Math.PI;
		return [
			this.radius * Math.sin(latitude) * Math.cos(longitude),
			this.radius * Math.sin(latitude) * Math.sin(longitude),
			this.radius * Math.cos(latitude),
		];
	}

	getVertices(color) {
		const vertices = [];
		for (let i = 0; i < this.widthSegments; i++) {
			for (let j = 0; j < this.heightSegments; j++) {
				vertices.push(
					this.getSegment(
						this.getPoint(
							i + this.gap,
							j + this.gap,
							this.widthSegments,
							this.heightSegments
						),
						this.getPoint(
							i + 1 - this.gap,
							j + this.gap,
							this.widthSegments,
							this.heightSegments
						),
						this.getPoint(
							i + 1 - this.gap,
							j + 1 - this.gap,
							this.widthSegments,
							this.heightSegments
						),
						this.getPoint(
							i + this.gap,
							j + 1 - this.gap,
							this.widthSegments,
							this.heightSegments
						),
						color
					)
				);
			}
		}

		return vertices.flat();
	}
}
