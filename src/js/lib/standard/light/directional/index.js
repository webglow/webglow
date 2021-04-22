import { mat3, vec3 } from 'gl-matrix';
import GameObject from '../../game-object';
import { NODE_TYPE } from '../../hierarchy/node';

export default class DirectionalLight extends GameObject {
	constructor(direction, intensity, color) {
		super(NODE_TYPE.DIRECTIONAL_LIGHT);
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
		return Array.from(this.toMat3());
	}
}
