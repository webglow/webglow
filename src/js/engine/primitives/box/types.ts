import { IMeshJSON } from 'engine/standard/mesh/types';
import { vec3 } from 'gl-matrix';

export interface IBoxConfig {
	size?: vec3;
}

export interface IBoxJSON extends IMeshJSON {
	size: [number, number, number];
}
