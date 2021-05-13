import { vec3 } from 'gl-matrix';
import Color from '../../../../utils/color';

export interface DirectionalLightConfig {
	position: vec3;
	direction: vec3;
	intensity: number;
	color: Color;
}
