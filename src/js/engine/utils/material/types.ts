import { UniformType } from '../shader-program/types';
import { ControlType } from '../shader/types';

export interface IMaterialParam {
	displayName: string;
	key: string;
	type: UniformType;
	value: any;
	controlType: ControlType;
}
