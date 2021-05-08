import VAO from '../../../utils/vao';
import DefaultMaterial2D from '../materials/default';

export default class Mesh2D {
	constructor(gl, gameObject) {
		/** @type {WebGL2RenderingContext} */
		this.gl = gl;

		this.attribLocations = {
			aPosition: 0,
		};

		this.materials = {
			default: new DefaultMaterial2D(this.gl, this.attribLocations),
		};
		this.vao = new VAO(this.gl, this.attribLocations);
		this.gameObject = gameObject;

		this.setupAttributes();
	}

	setupAttributes() {
		this.vao.setAttribute('aPosition', 3, this.gl.FLOAT);
	}

	setPositions(positions) {
		this.vao.setBufferData('aPosition', positions);
	}

	updateMatrix(mProjection) {
		const world = this.gameObject.transform.getWorld(this.gameObject.node);

		const worldViewProjection = this.gameObject.transform.getWorldViewProjection(
			world,
			mProjection
		);

		this.materials.default.setWorldViewProjection(worldViewProjection);

		return worldViewProjection;
	}

	draw(mProjection) {
		this.vao.bind();

		this.updateMatrix(mProjection);
	}
}
