import { vec3 } from 'gl-matrix';
import Color from '../../../utils/color';

export enum LightType {
	Directional,
	Point,
}

export interface ILightConfig {
	intensity: number;
	color: Color;
	type: LightType;
}
