import { mat3, vec3 } from 'gl-matrix';
import Color from '../../../utils/color';
import GameObject from '../../../utils/game-object';
import { LightConfig, LightType } from './types';

export default class Light {
	gameObject: GameObject;
	direction: vec3;
	intensity: number;
	color: Color;
	type: LightType;

	constructor(
		gameObject: GameObject,
		{
			position = [0, 0, 0],
			type,
			direction = [0, 0, 0],
			intensity,
			color,
		}: LightConfig
	) {
		this.gameObject = gameObject;
		this.direction = vec3.normalize(vec3.create(), direction);
		this.gameObject.transform.setPosition(position);
		this.intensity = intensity;
		this.color = color;
		this.type = type;
	}

	toMat3() {
		if (this.type === LightType.Directional) {
			// prettier-ignore
			return mat3.fromValues(
				...this.direction as [number, number, number],
				this.intensity, 0, 0,
				...this.color.toNormalizedVec3()
			);
		}

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
