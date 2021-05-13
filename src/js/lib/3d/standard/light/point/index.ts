import { mat3 } from 'gl-matrix';
import Color from '../../../../utils/color';
import GameObject from '../../../../utils/game-object';
import { PointLightConfig } from './types';

export default class PointLight {
	gameObject: GameObject;
	intensity: number;
	color: Color;

	constructor(
		gameObject: GameObject,
		{ position = [0, 0, 0], intensity, color }: PointLightConfig
	) {
		this.gameObject = gameObject;
		this.gameObject.transform.setPosition(position);
		this.intensity = intensity;
		this.color = color;
	}

	toMat3() {
		// prettier-ignore
		return mat3.fromValues(
			...this.gameObject.transform.position as [number, number, number],
			this.intensity, 0, 0,
			...this.color.toNormalizedVec3()
		);
	}

	toMat3Array() {
		return Array.from(this.toMat3());
	}
}
