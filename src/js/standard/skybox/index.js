import Sphere from '../../primitives/sphere';
import vertexSource from './shaders/vertex.glsl';
import fragmentSource from './shaders/fragment.glsl';

export default class SkyBox extends Sphere {
	constructor(
		gl,
		widthSegments,
		heightSegments,
		radius,
		color,
		gap = 0,
		innerFacing = true
	) {
		super(gl, widthSegments, heightSegments, radius, color, gap, innerFacing);
	}

	createProgram() {
		super.createProgram(vertexSource, fragmentSource);
	}
}
