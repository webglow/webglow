import { mat3 } from 'gl-matrix';
import Color from '../../../utils/color';
import Hierarchy from '../../../utils/hierarchy';

export default class Scene2D {
	constructor(gl, { backgroundColor = new Color('#000000') }) {
		this.gl = gl;
		this.hierarchy = new Hierarchy('root');

		this.backgroundColor = backgroundColor;
		this.gl.clearColor(...this.backgroundColor.toNormalizedVec3(), 1.0);

		this.setProjectionMatrix();
	}

	setProjectionMatrix() {
		this.mProjection = mat3.projection(
			mat3.create(),
			this.gl.canvas.clientWidth,
			this.gl.canvas.clientHeight
		);
	}

	draw() {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this.hierarchy.forEachDrawableNode((node) => {
			node.gameObject.mesh.draw(this.mProjection);
		});
	}
}
