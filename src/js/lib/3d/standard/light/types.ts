import { vec3 } from 'gl-matrix';
import Color from '../../../utils/color';

export enum LightType {
	Directional,
	Point,
}

export interface LightConfig {
	position?: vec3;
	direction?: vec3;
	intensity: number;
	color: Color;
	type: LightType;
}
