import Material from '../../../utils/material';

export default class Material3D extends Material {
	setWorldViewProjection(mWorldViewProjection) {
		this.setUniforms({
			uWorldViewProjection: {
				type: 'uniformMatrix4fv',
				value: [false, mWorldViewProjection],
			},
		});
	}

	setWorld(mWorld) {
		this.setUniforms({
			uWorld: {
				type: 'uniformMatrix4fv',
				value: [false, mWorld],
			},
		});
	}

	setWorldInverseTranspose(mWorldInverseTranspose) {
		this.setUniforms({
			uWorldInverseTranspose: {
				type: 'uniformMatrix4fv',
				value: [false, mWorldInverseTranspose],
			},
		});
	}

	setViewWorldPosition(vViewWorldPosition) {
		this.setUniforms({
			uViewWorldPosition: {
				type: 'uniform3f',
				value: vViewWorldPosition,
			},
		});
	}
}
