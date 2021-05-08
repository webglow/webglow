import Mesh2D from '../../standard/mesh';

export default class Point extends Mesh2D {
	constructor(gl, gameObject, { color }) {
		super(gl, gameObject);

		this.setPositions(new Float32Array([0, 0, 1]));

		color && this.setColor(color);
	}

	setColor(color) {
		this.materials.default.setColor(color);
	}

	draw(...args) {
		super.draw(...args);

		this.gl.drawArrays(this.gl.POINTS, 0, 1);
	}
}
