import { UniformType } from '../shader/types';

export interface IMaterialParam {
	displayName: string;
	key: string;
	type: UniformType;
	value: any;
}

export interface IMaterialJSON {
	id: string;
	displayName: string;
	shaderId: string;
	params: IMaterialParam[];
}
