export interface IGeometryData {
	positions: number[];
	normals: number[];
	textureCoords: number[];
}

export interface IGeometry {
	getGeometry(): IGeometryData;
}
