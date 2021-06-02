import Color from 'engine/utils/color';
import { vec3 } from 'gl-matrix';

export enum LightType {
	Directional,
	Point,
}

export interface ILightConfig {
	intensity: number;
	color: Color;
	type: LightType;
}
