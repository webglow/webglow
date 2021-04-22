import Shape from '.';

export default class StickShape extends Shape {
	constructor(gl, scene, color, size = 100, gap = 10) {
		super(gl, scene, color, size);

		const boxLength = size * 2 + gap;
		const boxRadius = size + gap / 2;
		this.b1.transform.translate([0, boxRadius + boxLength, 0]);
		this.b2.transform.translate([0, boxRadius, 0]);
		this.b3.transform.translate([0, -boxRadius, 0]);
		this.b4.transform.translate([0, -boxLength - boxRadius, 0]);
	}
}
