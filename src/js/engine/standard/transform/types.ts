import { quat, vec3 } from 'gl-matrix';

export interface ITransformInfo {
	position: vec3;
	rotation: quat;
	eulerRotation: vec3;
	scale: vec3;
}

export interface ITransformJSON {
	position: [number, number, number];
	rotation: [number, number, number, number];
	scale: [number, number, number];
}
