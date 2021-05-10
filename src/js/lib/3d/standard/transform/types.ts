import { vec3 } from 'gl-matrix';

export interface TransformInfo {
	position: vec3;
	rotation: vec3;
	scale: vec3;
}

export interface Subscriber {
	[key: string]: (info: TransformInfo) => void;
}
