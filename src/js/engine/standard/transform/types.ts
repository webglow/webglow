import { vec3 } from 'gl-matrix';

export interface ITransformInfo {
	position: vec3;
	rotation: vec3;
	scale: vec3;
}

export interface ISubscriber {
	[key: string]: (info: ITransformInfo) => void;
}

export interface ITransformJSON {
	position: [number, number, number];
	rotation: [number, number, number, number];
	scale: [number, number, number];
}
