import { UniformType } from 'engine/utils/shader-program/types';

export interface IShaderParam {
	displayName: string;
	key: string;
	type: UniformType;
	defaultValue: any;
}

export interface IShader {
	params?: IShaderParam[];
	vertex: string;
	fragment: string;
}
