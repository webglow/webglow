import { UniformType } from 'engine/utils/shader-program/types';

export enum ControlType {
	Checkbox,
	NumberInput,
	ColorInput,
}

export interface IShaderParam {
	displayName: string;
	key: string;
	type: UniformType;
	defaultValue: any;
	controlType: ControlType;
}

export interface IShader {
	params?: IShaderParam[];
	vertex: string;
	fragment: string;
}
