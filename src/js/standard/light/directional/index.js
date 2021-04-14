import { mat3, vec3 } from 'gl-matrix';

export default class DirectionalLight {
	constructor(direction, intensity, color) {
		this.direction = vec3.normalize(vec3.create(), direction);
		this.intensity = intensity;
		this.color = color;
	}

	toMat3() {
		// prettier-ignore
		return mat3.fromValues(
			...this.direction,
			this.intensity, 0, 0,
			...this.color
		);
	}

	toMat3Array() {
		// prettier-ignore
		return Array.from(mat3.fromValues(
			...this.direction,
			this.intensity, 0, 0,
			...this.color
		));
	}
}
