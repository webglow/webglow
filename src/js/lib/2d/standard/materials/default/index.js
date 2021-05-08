import vertexSource from './shaders/vertex.glsl';
import fragmentSource from './shaders/fragment.glsl';
import Material2D from '..';
import Color from '../../../../utils/color';

export default class DefaultMaterial2D extends Material2D {
	constructor(gl, attribLocations, { color = new Color('#ffffff') } = {}) {
		super(gl, vertexSource, fragmentSource, attribLocations);

		this.setColor(color);
	}

	setColor(color) {
		this.setUniforms({
			uColor: {
				type: 'uniform3f',
				value: [...color.toNormalizedVec3()],
			},
		});
	}
}
