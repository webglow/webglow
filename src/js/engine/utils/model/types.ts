export interface IPolygonGroup {
	name: string;
	materialName?: string;
	smooth: boolean;
	polygons: Array<string[]>;
	positions: number[];
	normals: number[];
}

export interface IParsedObj {
	vertices: Array<number[]>;
	normals: Array<number[]>;
	textureCoords: Array<number[]>;
	polygonGroups: IPolygonGroup[];
}

export interface IModelJSON {
	id: string;
	obj: string;
}
