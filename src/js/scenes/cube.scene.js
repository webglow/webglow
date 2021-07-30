import Plane from '../lib/geometry/plane';
import Scene from '../lib/standard/scene';
import SkyBox from '../lib/standard/skybox';
import DirectionalLight from '../lib/standard/light/directional';
import Box from '../lib/primitives/box';
import PointLight from '../lib/standard/light/point';
import Color from '../lib/standard/color';
import Sphere from '../lib/primitives/sphere';

export default class Cube extends Scene {
	constructor(gl) {
		super(gl, { cameraPosition: [0, 0, -3000] });

		this.hierarchy.addObject(
			'mainLight',
			new DirectionalLight(
				[0, 1, 0],
				1,
				new Color('#ffffff').toNormalizedVec3()
			)
		);
		this.hierarchy.addObject(
			'sunLight',
			new PointLight([0, 0, 1000], 1.0, new Color('#fff4d6').toNormalizedVec3())
		);
		this.setup();
	}

	getCustomTexture(color, color2) {
		const texture = this.gl.createTexture();
		const textureUnit = this.getFreeTextureUnit();
		this.gl.activeTexture(this.gl.TEXTURE0 + textureUnit);
		this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

		const level = 0;
		const width = 10;
		const height = 1;
		const border = 0;
		const format = this.gl.RGBA;
		const type = this.gl.UNSIGNED_BYTE;
		const dataA = [];
		let counter = 0;
		for (let i = 0; i < width; i++) {
			for (let j = 0; j < height; j++) {
				counter % 2 === 0 ? dataA.push(color) : dataA.push(color2);
				counter++;
			}
		}
		// prettier-ignore
		const data = new Uint8Array(dataA.flat());
		this.gl.texImage2D(
			this.gl.TEXTURE_2D,
			level,
			format,
			width,
			height,
			border,
			format,
			type,
			data
		);

		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MIN_FILTER,
			this.gl.NEAREST
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MAG_FILTER,
			this.gl.NEAREST
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_S,
			this.gl.CLAMP_TO_EDGE
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_T,
			this.gl.CLAMP_TO_EDGE
		);

		return textureUnit;
	}

	setup() {
		const sphereTexture = this.getCustomTexture(
			new Color('#ffcc00').toVec4(),
			new Color('#ff0c18').toVec4()
		);
		const plane = new Plane(this.gl, this, {
			width: 50000,
			length: 50000,
			widthSegments: 1,
			lengthSegments: 1,
			color: new Color('#222222').toVec4(),
			enableSpecular: true,
			specularStrength: 30,
		});
		const cube = new Box(this.gl, this, {
			size: [500, 500, 500],
			texture: sphereTexture,
			enableSpecular: true,
			specularStrength: 50,
		});
		const sphere = new Sphere(this.gl, this, {
			widthSegments: 32,
			heightSegments: 32,
			radius: 1000,
			texture: sphereTexture,
			enableSpecular: true,
			specularStrength: 80,
		});

		const skyBox = new SkyBox(this.gl, this, {
			size: [50000, 50000, 50000],
			color: new Color('#0000ff').toVec4(),
		});

		plane.transform.translate([0, -500, 0]);
		sphere.transform.translate([0, 2000, -0]);

		this.hierarchy.addObject('skyBox', skyBox);
		this.hierarchy.addObject('plane', plane);
		this.hierarchy.addObject('cube', cube);
		this.hierarchy.addObject('sphere', sphere);

		this.setupLight();
	}

	draw() {
		const skyBox = this.hierarchy.getObjectInstance('skyBox');
		const cube = this.hierarchy.getObjectInstance('cube');
		const sphere = this.hierarchy.getObjectInstance('sphere');

		cube.transform.rotate(0.01, [0, 1, 0]);
		sphere.transform.rotate(0.005, [1, 1, 0]);
		skyBox.transform.setPosition(this.sceneCamera.transform.vPosition);

		super.draw();
	}
}
