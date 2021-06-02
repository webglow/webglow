export interface ISensor {
	width: number;
	height: number;
	diagonal?: number;
}

export enum ProjectionType {
	Ortho,
	Perspective,
}
