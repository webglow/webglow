import { mat3, vec3 } from 'gl-matrix';

export default class DirectionalLight {
	constructor(
		gameObject,
		{ position = [0, 0, 0], direction, intensity, color }
	) {
		this.gameObject = gameObject;
		this.direction = vec3.normalize(vec3.create(), direction);
		this.gameObject.transform.setPosition(position);
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
		return Array.from(this.toMat3());
	}
}
