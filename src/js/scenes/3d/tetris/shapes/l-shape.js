import Shape from '.';

export default class LShape extends Shape {
	constructor(size = 1, gap = 10, mirror) {
		super(size);

		const boxLength = size + gap;
		const boxRadius = size / 2 + gap / 2;
		if (mirror) {
			this.b1.transform.translate([0, boxRadius, 0]);
			this.b2.transform.translate([-boxLength, boxRadius, 0]);
			this.b3.transform.translate([0, -boxRadius, 0]);
			this.b4.transform.translate([0, -boxLength - boxRadius, 0]);
		} else {
			this.b1.transform.translate([0, boxRadius, 0]);
			this.b2.transform.translate([boxLength, boxRadius, 0]);
			this.b3.transform.translate([0, -boxRadius, 0]);
			this.b4.transform.translate([0, -boxLength - boxRadius, 0]);
		}
	}
}
