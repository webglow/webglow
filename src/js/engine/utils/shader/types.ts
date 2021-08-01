import { UniformType } from 'engine/utils/shader-program/types';

export interface IShaderParam {
	displayName: string;
	key: string;
	type: UniformType;
	defaultValue: any;
}

export interface IShaderJSON {
	id: string;
	displayName: string;
	params: IShaderParam[];
	vertex: string;
	fragment: string;
}
