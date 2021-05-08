import Point from '../../lib/2d/primitives/point';
import Scene2D from '../../lib/2d/standard/scene';
import Transform2D from '../../lib/2d/standard/transform';
import Color from '../../lib/utils/color';
import GameObject from '../../lib/utils/game-object';

export default class Test2DScene extends Scene2D {
	constructor(gl, config) {
		super(gl, config);

		this.setup();
	}

	setup() {
		const point = new GameObject({
			gl: this.gl,
			scene: this,
			TransformType: Transform2D,
		});

		point.addMesh(Point, {});
		point.mesh.setColor(new Color('#ffcc00'));

		point.transform.translate([1000, 400]);
		this.hierarchy.addObject(point.node);
		this.point = point;
	}

	draw(...args) {
		super.draw(...args);
	}
}
