import { vec3 } from 'gl-matrix';
import Box from './primitives/box';
import { hexToRgb } from './helpers';
import Plane from './primitives/plane';
import Scene from './standard/scene';
import SkyBox from './standard/skybox';
import Sphere from './primitives/sphere';
import DirectionalLight from './standard/light/directional';
import PointLight from './standard/light/point';
import GameObject from './standard/game-object';

export default class MainScene extends Scene {
	constructor(gl) {
		super(gl);

		this.lightSources.directional.push(
			new DirectionalLight([1, 2, 0], 0.3, hexToRgb('#333333').vec3)
		);
		this.lightSources.point.push(
			new PointLight([-2000, 0, 0], 1.5, hexToRgb('#e74c3c').vec3),
			new PointLight([2000, 0, 0], 1.0, hexToRgb('#00ffff').vec3),
			new PointLight([0, 0, 2000], 1.0, hexToRgb('#00ff00').vec3),
			new PointLight([0, 0, -2000], 1.0, hexToRgb('#ffffff').vec3)
			// new PointLight([-10000, 3000, 0], 1.0, hexToRgb('#ffffff').vec3),
			// new PointLight([-2000, 2000, 0], 1.0, hexToRgb('#ffffff').vec3),
			// new PointLight([-2000, 2000, 0], 1.0, hexToRgb('#ffffff').vec3)
		);
		this.setup();
	}

	setup() {
		const cube = new Box(
			this.gl,
			'cube',
			[500, 500, 1000],
			[
				hexToRgb('#ffcc00').vec3,
				hexToRgb('#e74c3c').vec3,
				hexToRgb('#e67e22').vec3,
				hexToRgb('#27ae60').vec3,
				hexToRgb('#2980b9').vec3,
				hexToRgb('#34495e').vec3,
			],
			true,
			80
		);
		const plane = new Plane(
			this.gl,
			'plane',
			50000,
			50000,
			10,
			10,
			hexToRgb('#cd6133').vec3
		);

		const sun = new Sphere(
			this.gl,
			'sun',
			32,
			32,
			1000,
			hexToRgb('#e67e22').vec3,
			0,
			false,
			false,
			true,
			50
		);
		const mercury = new Sphere(
			this.gl,
			'mercury',
			32,
			32,
			200,
			hexToRgb('#e74c3c').vec3,
			0,
			false,
			false,
			true,
			50
		);
		const venus = new Sphere(
			this.gl,
			'venus',
			32,
			32,
			250,
			hexToRgb('#ffffff').vec3,
			0,
			false,
			false,
			true,
			50
		);
		const earth = new Sphere(
			this.gl,
			'earth',
			32,
			32,
			300,
			hexToRgb('#2980b9').vec3,
			0,
			false,
			false,
			true,
			50
		);
		const moon = new Sphere(
			this.gl,
			'moon',
			32,
			32,
			100,
			hexToRgb('#2980b9').vec3,
			0,
			false,
			false,
			true,
			50
		);

		const mercuryRotationPoint = new GameObject('mrp');
		const venusRotationPoint = new GameObject('vrp');
		const earthRotationPoint = new GameObject('erp');

		const skyBox = new SkyBox(
			this.gl,
			'skyBox',
			3,
			3,
			500000,
			hexToRgb('#48dbfb').vec3
		);

		moon.transform.translate([-500, 0, 0]);
		earth.transform.translate([-5000, 0, 0]);
		mercury.transform.translate([-2000, 0, 0]);
		venus.transform.translate([-3500, 0, 0]);
		sun.transform.translate([0, 2000, 0]);
		mercuryRotationPoint.transform.translate([0, 2000, 0]);
		venusRotationPoint.transform.translate([0, 2000, 0]);
		earthRotationPoint.transform.translate([0, 2000, 0]);

		plane.transform.translate([0, -1000, 0]);

		this.hierarchy.addObject(skyBox);
		this.hierarchy.addObject(cube);
		this.hierarchy.addObject(plane);
		this.hierarchy.addObject(mercuryRotationPoint);
		this.hierarchy.addObject(venusRotationPoint);
		this.hierarchy.addObject(earthRotationPoint);

		this.hierarchy.addObject(sun);
		this.hierarchy.addObject(mercury, mercuryRotationPoint.node);
		this.hierarchy.addObject(venus, venusRotationPoint.node);
		this.hierarchy.addObject(earth, earthRotationPoint.node);
		this.hierarchy.addObject(moon, earth.node);

		this.setupLight();
	}

	draw() {
		const cube = this.hierarchy.getObjectInstance('cube');
		const plane = this.hierarchy.getObjectInstance('plane');

		const mercuryRotationPoint = this.hierarchy.getObjectInstance('mrp');
		const venusRotationPoint = this.hierarchy.getObjectInstance('vrp');
		const earthRotationPoint = this.hierarchy.getObjectInstance('erp');
		const earth = this.hierarchy.getObjectInstance('earth');

		const skyBox = this.hierarchy.getObjectInstance('skyBox');

		// cube.rotate(0.01, vec3.fromValues(1, 0, 0));
		cube.transform.rotate(0.03, vec3.fromValues(0, 1, 0));
		plane.transform.rotate(0.001, vec3.fromValues(0, 1, 0));

		mercuryRotationPoint.transform.rotate(0.03, vec3.fromValues(0, 1, 0));
		venusRotationPoint.transform.rotate(0.02, vec3.fromValues(0, 1, 0));
		earthRotationPoint.transform.rotate(0.01, vec3.fromValues(0, 1, 0));
		earth.transform.rotate(0.1, vec3.fromValues(0, 1, 0));

		skyBox.transform.setPosition(window.global.camera.vPosition);

		super.draw();
	}
}
