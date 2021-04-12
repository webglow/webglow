import Sphere from '../sphere';

export default class SkyBox extends Sphere {
	constructor(
		gl,
		widthSegments,
		heightSegments,
		radius,
		skyColor,
		groundColor,
		gap = 0,
		innerFacing = true
	) {
		super(gl, widthSegments, heightSegments, radius, [], gap, innerFacing);

		this.skyColor = skyColor;
		this.groundColor = groundColor;

		this.setupSkyBox();
	}

	setup() {}

	setupSkyBox() {
		super.setupProgram();

		this.aPositions = new Float32Array(this.getVertices(this.color));

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			this.aPositions,
			this.gl.STATIC_DRAW
		);

		this.aColors = [];

		for (let i = 0; i < this.widthSegments; i++) {
			for (let j = 0; j < this.heightSegments; j++) {
				const latitude = (j / this.heightSegments) * Math.PI;

				if (latitude < Math.PI / 2) {
					this.aColors.push(this.getColorForSegment(this.skyColor));
				} else {
					this.aColors.push(this.getColorForSegment(this.groundColor));
				}
			}
		}

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorsBuffer);
		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			new Float32Array(this.aColors.flat()),
			this.gl.STATIC_DRAW
		);
	}

	getColorForSegment(c) {
		return [...c, ...c, ...c, ...c, ...c, ...c];
	}
}
