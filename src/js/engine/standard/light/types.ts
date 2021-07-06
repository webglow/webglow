import Color from 'engine/utils/color';

export enum LightType {
	Directional,
	Point,
}

export interface ILightConfig {
	intensity: number;
	color: Color;
	type: LightType;
}

export interface ILightJSON {
	color: string;
	type: LightType;
	intensity: number;
}
