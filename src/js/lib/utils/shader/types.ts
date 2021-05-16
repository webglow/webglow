import { UniformType } from '../shader-program/types';

export interface ShaderParam {
	displayName: string;
	key: string;
	type: UniformType;
	value: any;
}

export interface Shader {
	params?: ShaderParam[];
	vertex: string;
	fragment: string;
}
