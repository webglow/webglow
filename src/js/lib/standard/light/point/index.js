import { mat3 } from 'gl-matrix';
import GameObject from '../../game-object';
import { NODE_TYPE } from '../../hierarchy/node';

export default class PointLight extends GameObject {
	constructor(position, intensity, color) {
		super(NODE_TYPE.POINT_LIGHT);
		this.transform.setPosition(position);
		this.intensity = intensity;
		this.color = color;
	}

	toMat3() {
		// prettier-ignore
		return mat3.fromValues(
			...this.transform.vPosition,
			this.intensity, 0, 0,
			...this.color
		);
	}

	toMat3Array() {
		return Array.from(this.toMat3());
	}
}
