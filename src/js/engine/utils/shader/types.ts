import { UniformType } from 'engine/utils/shader-program/types';

export interface IShaderParam {
	displayName: string;
	key: string;
	type: UniformType;
	value: any;
}

export interface IShader {
	params?: IShaderParam[];
	vertex: string;
	fragment: string;
}
