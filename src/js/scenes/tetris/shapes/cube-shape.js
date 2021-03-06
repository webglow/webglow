import Shape from '.';

export default class CubeShape extends Shape {
	constructor(size = 1, gap = 10) {
		super(size);

		const boxRadius = size / 2 + gap / 2;
		this.b1.transform.translate([boxRadius, boxRadius, 0]);
		this.b2.transform.translate([-boxRadius, boxRadius, 0]);
		this.b3.transform.translate([boxRadius, -boxRadius, 0]);
		this.b4.transform.translate([-boxRadius, -boxRadius, 0]);
	}
}
