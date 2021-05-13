import { vec3 } from 'gl-matrix';
import Color from '../../../../utils/color';

export interface PointLightConfig {
	position: vec3;
	intensity: number;
	color: Color;
}
