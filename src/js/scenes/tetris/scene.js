import BoxCollider from '../../lib/physics/collider/box-collider';
import CollisionDetector from '../../lib/physics/collision-detector';
import Plane from '../../lib/primitives/plane';
import Color from '../../lib/standard/color';
import GameObject from '../../lib/standard/game-object';
import DirectionalLight from '../../lib/standard/light/directional';
import PointLight from '../../lib/standard/light/point';
import Scene from '../../lib/standard/scene';
import CubeShape from './shapes/cube-shape';
import LShape from './shapes/l-shape';
import StairsShape from './shapes/stairs-shape';
import StickShape from './shapes/stick-shape';
import TShape from './shapes/t-shape';

export default class Tetris extends Scene {
	constructor(gl) {
		super(gl, { cameraPosition: [0, 0, -5000] });

		this.collisionDetector = new CollisionDetector(this.hierarchy);
		// const mainLight = new GameObject({ gl: this.gl, scene: this });
		// mainLight.addLight(DirectionalLight, {
		// direction: [0, 1, 1],
		// intensity: 1,
		// color: new Color('#ffffff').toNormalizedVec3(),
		// });

		// this.hierarchy.addObject(mainLight.node, 'mainLight');
		const pointLight = new GameObject({ gl: this.gl, scene: this });
		pointLight.addLight(PointLight, {
			position: [0, -1000, 1000],
			intensity: 1,
			color: new Color('#ffffff').toNormalizedVec3(),
		});

		this.hierarchy.addObject(pointLight.node, 'pointLight');

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
		const ground = new GameObject({ gl: this.gl, scene: this });
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

		this.hierarchy.addObject(ground.node, 'ground');

		// for (let i = 0; i < 20; i++) {
		this.randomShape = this.getRandomShape();
		this.randomShape.parent.transform.translate([0, 3000, 0]);

		this.hierarchy.addObject(this.randomShape.parent.node);
		// }

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

		this.collisionDetector.checkCollision();

		this.randomShape.move();
	}
}
