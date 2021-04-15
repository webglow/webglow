import { mat3 } from 'gl-matrix';

export default class PointLight {
	constructor(position, intensity, color) {
		this.position = position;
		this.intensity = intensity;
		this.color = color;
	}

	toMat3() {
		// prettier-ignore
		return mat3.fromValues(
			...this.position,
			this.intensity, 0, 0,
			...this.color
		);
	}

	toMat3Array() {
		// prettier-ignore
		return Array.from(mat3.fromValues(
			...this.position,
			this.intensity, 0, 0,
			...this.color
		));
	}
}
