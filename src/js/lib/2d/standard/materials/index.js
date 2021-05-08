import Material from '../../../utils/material';

export default class Material2D extends Material {
	setWorldViewProjection(mWorldViewProjection) {
		this.setUniforms({
			uWorldViewProjection: {
				type: 'uniformMatrix3fv',
				value: [false, mWorldViewProjection],
			},
		});
	}
}
