import Scene from 'engine/standard/scene';
import CollisionDetector from 'engine/physics/collision-detector';
import Color from 'engine/utils/color';
import GameObject from 'engine/utils/game-object';
import { LightType } from 'engine/standard/light/types';
import Plane from 'engine/geometry/plane';
import Script from 'engine/utils/script';
import CubeShape from './shapes/cube-shape';
import LShape from './shapes/l-shape';
import StairsShape from './shapes/stairs-shape';
import StickShape from './shapes/stick-shape';
import TShape from './shapes/t-shape';
import Shape from './shapes';
import Material from '../../engine/utils/material';

export default class Tetris extends Scene {
	collisionDetector: CollisionDetector;

	shapes: any[];

	randomShape: Shape;

	constructor() {
		super();

		this.collisionDetector = new CollisionDetector(this.hierarchy);
		const pointLight = new GameObject();
		pointLight.addLight({
			type: LightType.Point,
			intensity: 1,
			color: new Color('#ffffff'),
		});

		this.hierarchy.addObject(pointLight, 'pointLight');

		const directionalLight = new GameObject();
		directionalLight.addLight({
			type: LightType.Directional,
			intensity: 0.5,
			color: new Color('#ffffff'),
		});
		directionalLight.transform.rotate([-90, 0, 0]);

		this.hierarchy.addObject(directionalLight, 'directionalLight');

		this.shapes = [TShape, LShape, StairsShape, StickShape, CubeShape];
		this.setup();
	}

	getRandomShape() {
		const shape = new this.shapes[
			Math.floor(Math.random() * this.shapes.length)
		](1, 0, Math.floor(Math.random() * 2));

		return shape;
	}

	setup() {
		const ground = new GameObject();
		ground.addMesh(
			new Plane({
				width: 500,
				length: 500,
				widthSegments: 1,
				lengthSegments: 1,
			})
		);

		ground.addMaterial(new Material());

		ground.transform.translate([0, -20, 0]);

		this.hierarchy.addObject(ground, 'ground');

		this.randomShape = this.getRandomShape();
		this.randomShape.parent.transform.translate([0, 3, 0]);
		const randomShapeScript = new Script('movement');
		this.randomShape.parent.addScript(randomShapeScript);
		randomShapeScript.assign(this.randomShape.parent);

		this.hierarchy.addObject(this.randomShape.parent, 'shape');

		document.addEventListener('keydown', (event) => {
			if (event.code === 'Space') {
				this.randomShape.parent.transform.rotate([0, 0, 90]);
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
}
