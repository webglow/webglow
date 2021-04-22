import Shape from '.';

export default class CubeShape extends Shape {
	constructor(gl, scene, color, size = 100, gap = 10) {
		super(gl, scene, color, size);

		const boxRadius = size + gap / 2;
		this.b1.transform.translate([boxRadius, boxRadius, 0]);
		this.b2.transform.translate([-boxRadius, boxRadius, 0]);
		this.b3.transform.translate([boxRadius, -boxRadius, 0]);
		this.b4.transform.translate([-boxRadius, -boxRadius, 0]);
	}
}
