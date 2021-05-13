import BoxCollider from '../../../lib/3d/physics/collider/box-collider';
import CollisionDetector from '../../../lib/3d/physics/collision-detector';
import Plane from '../../../lib/3d/primitives/plane';
import Color from '../../../lib/utils/color';
import PointLight from '../../../lib/3d/standard/light/point';
import Scene from '../../../lib/3d/standard/scene';
import CubeShape from './shapes/cube-shape';
import LShape from './shapes/l-shape';
import StairsShape from './shapes/stairs-shape';
import StickShape from './shapes/stick-shape';
import TShape from './shapes/t-shape';
import GameObject from '../../../lib/utils/game-object';
import Shape from './shapes';
import Script from '../../../lib/utils/script';

export default class Tetris extends Scene {
	collisionDetector: CollisionDetector;

	shapes: any[];

	randomShape: Shape;

	constructor(gl: WebGL2RenderingContext, config: any) {
		super(gl, {
			...config,
			cameraPosition: [0, 0, -5000],
			backgroundColor: new Color('#2980b9'),
		});

		this.collisionDetector = new CollisionDetector(this.hierarchy);
		const pointLight = new GameObject({ gl: this.gl });
		pointLight.addLight(PointLight, {
			position: [0, -1000, 1000],
			intensity: 1,
			color: new Color('#ffffff'),
		});

		this.hierarchy.addObject(pointLight, 'pointLight');

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
			200,
			0,
			Math.floor(Math.random() * 2)
		);

		return shape;
	}

	setup() {
		const ground = new GameObject({ gl: this.gl });
		ground.addMesh(Plane, {
			width: 50000,
			length: 50000,
			widthSegments: 1,
			lengthSegments: 1,
			color: new Color('#222222').toVec4(),
			enableSpecular: true,
		});

		ground.addCollider(BoxCollider, {
			min: [-25000, -50, -25000],
			max: [25000, 50, 25000],
		});

		ground.transform.translate([0, -2000, 0]);

		this.hierarchy.addObject(ground, 'ground');

		this.randomShape = this.getRandomShape();
		this.randomShape.parent.transform.translate([0, 3000, 0]);
		const randomShapeScript = new Script('movement', this.randomShape.parent);
		this.randomShape.parent.addScript(randomShapeScript);

		this.hierarchy.addObject(this.randomShape.parent, 'shape');

		this.setupLight();

		document.addEventListener('keydown', (event) => {
			if (event.code === 'Space') {
				this.randomShape.parent.transform.rotate(Math.PI / 2, [0, 0, 1]);
			} else if (event.code === 'ArrowRight') {
				this.randomShape.setVelocity([100, 0, 0]);
			} else if (event.code === 'ArrowLeft') {
				this.randomShape.setVelocity([-100, 0, 0]);
			}
		});

		document.addEventListener('keyup', (event) => {
			if (event.code === 'ArrowRight' || event.code === 'ArrowLeft') {
				this.randomShape.setVelocity([0, 0, 0]);
			}
		});
	}

	draw() {
		super.draw(
			this.sceneCamera.transform.position,
			this.sceneCamera.transform.viewMatrix
		);

		// this.collisionDetector.checkCollision();

		// this.randomShape.move();
	}
}
