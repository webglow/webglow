import { UniformType } from '../shader-program/types';
import { IShader } from '../shader/types';

export interface IMaterialParam {
	displayName: string;
	key: string;
	type: UniformType;
	value: any;
}

export interface IMaterialJSON {
	shader: IShader;
	params: IMaterialParam[];
}
