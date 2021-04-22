import Plane from '../../lib/primitives/plane';
import Color from '../../lib/standard/color';
import DirectionalLight from '../../lib/standard/light/directional';
import Scene from '../../lib/standard/scene';
import CubeShape from './shapes/cube-shape';
import LShape from './shapes/l-shape';
import StairsShape from './shapes/stairs-shape';
import StickShape from './shapes/stick-shape';
import TShape from './shapes/t-shape';

export default class Tetris extends Scene {
	constructor(gl) {
		super(gl, { cameraPosition: [0, 0, -5000] });

		this.hierarchy.addObject(
			new DirectionalLight(
				[0, 0, 1],
				1,
				new Color('#ffffff').toNormalizedVec3()
			).node,
			'mainLight'
		);

		this.shapes = [TShape, LShape, StairsShape, StickShape, CubeShape];
		this.setup();
	}

	getRandomShape() {
		const shape = new this.shapes[
			Math.floor(Math.random() * this.shapes.length)
		](
			this.gl,
			this,
			new Color().toVec4(),
			100,
			10,
			Math.floor(Math.random() * 2)
		);

		return shape;
	}

	setup() {
		const ground = new Plane(this.gl, this, {
			width: 50000,
			length: 50000,
			widthSegments: 1,
			lengthSegments: 1,
			color: new Color('#222222').toVec4(),
		});

		ground.transform.translate([0, -2000, 0]);

		this.hierarchy.addObject(ground.node, 'ground');

		this.randomShape = this.getRandomShape();
		this.randomShape.parent.transform.translate([0, 3000, 0]);

		this.hierarchy.addObject(this.randomShape.parent.node);

		this.setupLight();

		document.addEventListener('keydown', (event) => {
			if (event.code === 'Space') {
				this.randomShape.parent.transform.rotate(Math.PI / 2, [0, 0, 1]);
			}
		});
	}

	draw() {
		super.draw();

		this.randomShape.move();
	}
}
