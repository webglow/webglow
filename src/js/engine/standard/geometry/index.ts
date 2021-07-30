import { IGeometryJSON } from './types';

export default class Geometry {
	id: string;
	name: string;
	positions: Float32Array;
	normals: Float32Array;
	textureCoords: Float32Array;

	construct() {}

	toJSON(): IGeometryJSON {
		return {
			name: this.name,
			positions: Array.from(this.positions),
			normals: Array.from(this.normals),
			textureCoords: Array.from(this.textureCoords),
		};
	}

	static fromJSON({
		name,
		positions,
		normals,
		textureCoords,
	}: IGeometryJSON): Geometry {
		const geometry = new Geometry();
		geometry.name = name;
		geometry.positions = new Float32Array(positions);
		geometry.normals = new Float32Array(normals);
		geometry.textureCoords = new Float32Array(textureCoords);

		return geometry;
	}

	static emtpy(id: string, name: string) {
		const geometry = new Geometry();
		geometry.id = id;
		geometry.name = name;
		geometry.positions = new Float32Array([]);
		geometry.normals = new Float32Array([]);
		geometry.textureCoords = new Float32Array([]);

		return geometry;
	}
}
