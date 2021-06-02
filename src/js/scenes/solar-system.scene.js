import { hexToRgb } from '../lib/helpers';
import Plane from '../lib/primitives/plane';
import Scene from '../lib/standard/scene';
import SkyBox from '../lib/standard/skybox';
import Sphere from '../lib/primitives/sphere';
import DirectionalLight from '../lib/standard/light/directional';
import PointLight from '../lib/standard/light/point';
import GameObject from '../lib/standard/game-object';

export default class SolarSystem extends Scene {
	constructor(gl) {
		super(gl, { cameraPosition: [0, 2500, 72000] });

		this.setup();
	}

	setup() {
		this.hierarchy.addObject(
			'mainLight',
			new DirectionalLight([0, -1, 0], 0.1, hexToRgb('#ffffff').vec3)
		);
		this.hierarchy.addObject(
			'sunLight',
			new PointLight([0, 2000, 0], 2.0, hexToRgb('#fff4d6').vec3)
		);

		const plane = new Plane(this.gl, this.sceneCamera, {
			width: 500000,
			length: 500000,
			widthSegments: 1,
			lengthSegments: 1,
			color: hexToRgb('#222222').vec3,
			enableSpecular: true,
			specularStrength: 30,
		});
		const sun = new Sphere(this.gl, this.sceneCamera, {
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

		const skyBox = new SkyBox(this.gl, this.sceneCamera, {
			widthSegments: 3,
			heightSegments: 3,
			radius: 500000,
			color: hexToRgb('#444444').vec3,
		});

		sun.transform.translate([0, 2000, 0]);

		plane.transform.translate([0, -3000, 0]);

		this.hierarchy.addObject('skyBox', skyBox);
		this.hierarchy.addObject('plane', plane);

		this.hierarchy.addObject('sun', sun);

		this.planets.forEach((planetConfig, index) => {
			const planet = new Sphere(this.gl, this.sceneCamera, {
				widthSegments: 32,
				heightSegments: 32,
				radius: planetConfig.radius,
				color: hexToRgb(planetConfig.color).vec3,
				enableSpecular: true,
				specularStrength: 50,
			});

			const planetRotationPoint = new GameObject();

			planet.transform.translate([-(index + 1) * 6000, 0, 0]);

			this.hierarchy.addObject(
				`${planetConfig.name}RotationPoint`,
				planetRotationPoint,
				sun.node
			);
			this.hierarchy.addObject(
				planetConfig.name,
				planet,
				planetRotationPoint.node
			);
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

		skyBox.transform.setPosition(this.sceneCamera.transform.vPosition);

		super.draw();
	}
}
