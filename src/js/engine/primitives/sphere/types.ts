import { IMeshJSON } from 'engine/standard/mesh/types';

export interface ISphereConfig {
	widthSegments: number;
	heightSegments: number;
	radius: number;
	polygonal: boolean;
}

export interface ISphereJSON extends IMeshJSON {
	widthSegments: number;
	heightSegments: number;
	radius: number;
	polygonal: boolean;
}
