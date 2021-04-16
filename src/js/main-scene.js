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
			new DirectionalLight([0, -1, 0], 0.1, hexToRgb('#ffffff').vec3)
		);
		this.lightSources.point.push(
			// new DirectionalLight([1, 2, 0], 0.9, hexToRgb('#fff4d6').vec3)
			// new PointLight([-2000, 0, 0], 1.5, hexToRgb('#e74c3c').vec3),
			// new PointLight([2000, 0, 0], 1.0, hexToRgb('#00ffff').vec3),
			// new PointLight([0, 0, 2000], 1.0, hexToRgb('#00ff00').vec3),
			// new PointLight([0, 0, -2000], 1.0, hexToRgb('#ffffff').vec3)
			new PointLight([0, 2000, 0], 2.0, hexToRgb('#fff4d6').vec3)
			// new PointLight([-2000, 2000, 0], 1.0, hexToRgb('#ffffff').vec3),
			// new PointLight([-2000, 2000, 0], 1.0, hexToRgb('#ffffff').vec3)
		);
		this.setup();
	}

	setup() {
		// const cube = new Box(this.gl, 'cube', {
		// size: [500, 500, 1000],
		// colors: [
		// hexToRgb('#ffcc00').vec3,
		// hexToRgb('#e74c3c').vec3,
		// hexToRgb('#e67e22').vec3,
		// hexToRgb('#27ae60').vec3,
		// hexToRgb('#2980b9').vec3,
		// hexToRgb('#34495e').vec3,
		// ],
		// enableSpecular: true,
		// specularStrength: 80,
		// });
		const plane = new Plane(this.gl, 'plane', {
			width: 500000,
			length: 500000,
			widthSegments: 1,
			lengthSegments: 1,
			color: hexToRgb('#222222').vec3,
			enableSpecular: true,
			specularStrength: 30,
		});
		const sun = new Sphere(this.gl, 'sun', {
			widthSegments: 32,
			heightSegments: 32,
			radius: 5000,
			color: hexToRgb('#ffffff').vec3,
			enableLighting: false,
		});
		const earthSize = 200;
		this.planets = [
			{
				name: 'mercury',
				color: '#e74c3c',
				rotationSpeed: 0.03,
				radius: earthSize * 0.38,
			},
			{
				name: 'venus',
				color: '#cccccc',
				rotationSpeed: 0.02,
				radius: earthSize * 0.95,
			},
			{
				name: 'earth',
				color: '#2980b9',
				rotationSpeed: 0.01,
				radius: earthSize,
			},
			{
				name: 'mars',
				color: '#e74c3c',
				rotationSpeed: 0.008,
				radius: earthSize * 0.53,
			},
			{
				name: 'jupiter',
				color: '#DBDED1',
				rotationSpeed: 0.005,
				radius: earthSize * 11.2,
			},
			{
				name: 'saturn',
				color: '#C59E6C',
				rotationSpeed: 0.002,
				radius: earthSize * 9.45,
			},
			{
				name: 'uranus',
				color: '#ABCFD5',
				rotationSpeed: 0.001,
				radius: earthSize * 4,
			},
			{
				name: 'neptune',
				color: '#5C719E',
				rotationSpeed: 0.0008,
				radius: earthSize * 3.88,
			},
			{
				name: 'pluto',
				color: '#D1C4B3',
				rotationSpeed: 0.0004,
				radius: earthSize * 0.2,
			},
		];

		const skyBox = new SkyBox(this.gl, 'skyBox', {
			widthSegments: 3,
			heightSegments: 3,
			radius: 500000,
			color: hexToRgb('#444444').vec3,
		});

		sun.transform.translate([0, 2000, 0]);

		plane.transform.translate([0, -3000, 0]);

		this.hierarchy.addObject(skyBox);
		// this.hierarchy.addObject(cube);
		this.hierarchy.addObject(plane);

		this.hierarchy.addObject(sun);

		this.planets.forEach((planetConfig, index) => {
			const planet = new Sphere(this.gl, planetConfig.name, {
				widthSegments: 32,
				heightSegments: 32,
				radius: planetConfig.radius,
				color: hexToRgb(planetConfig.color).vec3,
				enableSpecular: true,
				specularStrength: 50,
			});

			const planetRotationPoint = new GameObject(
				`${planetConfig.name}RotationPoint`
			);

			planet.transform.translate([-(index + 1) * 6000, 0, 0]);

			this.hierarchy.addObject(planetRotationPoint, sun.node);
			this.hierarchy.addObject(planet, planetRotationPoint.node);
		});

		this.setupLight();
	}

	draw() {
		const skyBox = this.hierarchy.getObjectInstance('skyBox');

		this.planets.forEach((planetConfig) => {
			const planetRotationPoint = this.hierarchy.getObjectInstance(
				`${planetConfig.name}RotationPoint`
			);

			planetRotationPoint.transform.rotate(planetConfig.rotationSpeed, [
				0,
				1,
				0,
			]);
		});

		skyBox.transform.setPosition(window.global.camera.vPosition);

		super.draw();
	}
}
