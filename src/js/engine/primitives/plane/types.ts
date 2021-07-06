import { IMeshJSON } from 'engine/standard/mesh/types';

export interface IPlaneConfig {
	width: number;
	length: number;
	widthSegments: number;
	lengthSegments: number;
	heightMap: Array<number>;
}

export interface IPlaneJSON extends IMeshJSON {
	width: number;
	length: number;
	widthSegments: number;
	lengthSegments: number;
	heightMap: Array<number>;
}
