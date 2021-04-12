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
		gap = 0,
		innerFacing = false
	) {
		super(gl);

		this.widthSegments = widthSegments;
		this.heightSegments = heightSegments;
		this.radius = radius;
		this.gap = gap;
		this.color = color;
		this.innerFacing = innerFacing;

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

	getPoint(i, j, width, height) {
		const longitude = ((i % width) / width) * 2 * Math.PI;
		const latitude = (j / height) * Math.PI;
		let point = [
			this.radius * Math.sin(latitude) * Math.cos(longitude),
			this.radius * Math.sin(latitude) * Math.sin(longitude),
			this.radius * Math.cos(latitude),
		];

		if (this.innerFacing) {
			point = [point[0], point[2], point[1]];
		}

		return point;
	}

	getVertices() {
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
						)
					)
				);
			}
		}

		return vertices.flat();
	}
}
