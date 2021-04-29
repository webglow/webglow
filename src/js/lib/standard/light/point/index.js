import { mat3 } from 'gl-matrix';

export default class PointLight {
	constructor(gameObject, { position = [0, 0, 0], intensity, color }) {
		this.gameObject = gameObject;
		this.gameObject.transform.setPosition(position);
		this.intensity = intensity;
		this.color = color;
	}

	toMat3() {
		// prettier-ignore
		return mat3.fromValues(
			...this.gameObject.transform.position,
			this.intensity, 0, 0,
			...this.color
		);
	}

	toMat3Array() {
		return Array.from(this.toMat3());
	}
}
