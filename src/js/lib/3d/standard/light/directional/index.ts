import { mat3, vec3 } from 'gl-matrix';
import Color from '../../../../utils/color';
import GameObject from '../../../../utils/game-object';
import { DirectionalLightConfig } from './types';

export default class DirectionalLight {
	gameObject: GameObject;
	direction: vec3;
	intensity: number;
	color: Color;

	constructor(
		gameObject: GameObject,
		{
			position = [0, 0, 0],
			direction,
			intensity,
			color,
		}: DirectionalLightConfig
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
			...this.direction as [number, number, number],
			this.intensity, 0, 0,
			...this.color.toNormalizedVec3()
		);
	}

	toMat3Array() {
		return Array.from(this.toMat3());
	}
}
