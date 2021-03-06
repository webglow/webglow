import Color from 'engine/utils/color';
import GameObject from 'engine/utils/game-object';
import { mat3, vec3 } from 'gl-matrix';
import { makeAutoObservable } from 'mobx';
import { ILightConfig, ILightJSON, LightType } from './types';

export default class Light {
	gameObject: GameObject;
	intensity: number;
	color: Color;
	type: LightType;

	constructor(
		gameObject: GameObject,
		{ type, intensity, color }: ILightConfig
	) {
		this.gameObject = gameObject;
		this.intensity = intensity;
		this.color = color;
		this.type = type;

		makeAutoObservable(this);
	}

	toJSON(): ILightJSON {
		return {
			color: this.color.hex,
			type: this.type,
			intensity: this.intensity,
		};
	}

	toMat3() {
		if (this.type === LightType.Directional) {
			const world = this.gameObject.transform.getWorld();
			const direction = vec3.fromValues(0, 0, 1);
			vec3.transformMat4(direction, direction, world);
			vec3.normalize(direction, direction);

			// prettier-ignore
			return mat3.fromValues(
				...direction as [number, number, number],
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
