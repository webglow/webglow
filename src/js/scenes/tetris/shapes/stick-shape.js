import Shape from '.';

export default class StickShape extends Shape {
	constructor(size = 1, gap = 10) {
		super(size);

		const boxLength = size + gap;
		const boxRadius = size / 2 + gap / 2;
		this.b1.transform.translate([0, boxRadius + boxLength, 0]);
		this.b2.transform.translate([0, boxRadius, 0]);
		this.b3.transform.translate([0, -boxRadius, 0]);
		this.b4.transform.translate([0, -boxLength - boxRadius, 0]);
	}
}
