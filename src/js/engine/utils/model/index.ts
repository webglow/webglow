import { vec3 } from 'gl-matrix';
import { v4 as uuidv4 } from 'uuid';
import Geometry from '../../standard/geometry';
import { IModelJSON, IParsedObj, IPolygonGroup } from './types';

export default class Model {
	id: string;
	obj: string;
	geometries: Geometry[];

	constructor(_obj: string, id?: string) {
		this.obj = _obj;
		this.id = id || uuidv4();
		this.geometries = [];
	}

	toJSON(): IModelJSON {
		return {
			obj: this.obj,
			id: this.id,
		};
	}

	static fromJSON({ id, obj }: IModelJSON) {
		return new Model(obj, id);
	}

	genSmoothNormals(verticesData: Array<number[]>, polygonGroup: IPolygonGroup) {
		const normals: Array<number[]> = [];
		const positions: Array<number[]> = [];
		const vertexNormals: Array<Array<vec3>> = [];

		polygonGroup.polygons.forEach((polygon) => {
			const vIndices = polygon.map((f) => parseInt(f.split('/')[0]));

			for (let i = 0; i < vIndices.length - 2; i++) {
				const p1 = verticesData[vIndices[0] - 1];
				const p2 = verticesData[vIndices[i + 1] - 1];
				const p3 = verticesData[vIndices[i + 2] - 1];

				const n = vec3.normalize(
					vec3.create(),
					vec3.cross(
						vec3.create(),
						vec3.subtract(vec3.create(), p2 as vec3, p1 as vec3),
						vec3.subtract(vec3.create(), p3 as vec3, p1 as vec3)
					)
				);

				vertexNormals[vIndices[0] - 1]
					? vertexNormals[vIndices[0] - 1].push(n)
					: (vertexNormals[vIndices[0] - 1] = [n]);
				vertexNormals[vIndices[i + 1] - 1]
					? vertexNormals[vIndices[i + 1] - 1].push(n)
					: (vertexNormals[vIndices[i + 1] - 1] = [n]);
				vertexNormals[vIndices[i + 2] - 1]
					? vertexNormals[vIndices[i + 2] - 1].push(n)
					: (vertexNormals[vIndices[i + 2] - 1] = [n]);
			}
		});

		polygonGroup.polygons.forEach((polygon) => {
			const vIndices = polygon.map((f) => parseInt(f.split('/')[0]));

			for (let i = 0; i < vIndices.length - 2; i++) {
				const p1 = verticesData[vIndices[0] - 1];
				const p2 = verticesData[vIndices[i + 1] - 1];
				const p3 = verticesData[vIndices[i + 2] - 1];
				positions.push(p1);
				positions.push(p2);
				positions.push(p3);

				const n = vec3.normalize(
					vec3.create(),
					vec3.cross(
						vec3.create(),
						vec3.subtract(vec3.create(), p2 as vec3, p1 as vec3),
						vec3.subtract(vec3.create(), p3 as vec3, p1 as vec3)
					)
				);

				const n1 = vertexNormals[vIndices[0] - 1]
					.filter((normal) => vec3.dot(n, normal) > 0)
					.reduce(
						(acc, curr) => {
							acc[0] += curr[0];
							acc[1] += curr[1];
							acc[2] += curr[2];

							return acc;
						},
						[0, 0, 0] as vec3
					)
					.map((nSum: number) => nSum / vertexNormals[vIndices[0] - 1].length);
				const n2 = vertexNormals[vIndices[i + 1] - 1]
					.filter((normal) => vec3.dot(n, normal) > 0)
					.reduce(
						(acc, curr) => {
							acc[0] += curr[0];
							acc[1] += curr[1];
							acc[2] += curr[2];

							return acc;
						},
						[0, 0, 0] as vec3
					)
					.map(
						(nSum: number) => nSum / vertexNormals[vIndices[i + 1] - 1].length
					);
				const n3 = vertexNormals[vIndices[i + 2] - 1]
					.filter((normal) => vec3.dot(n, normal) > 0)
					.reduce(
						(acc, curr) => {
							acc[0] += curr[0];
							acc[1] += curr[1];
							acc[2] += curr[2];

							return acc;
						},
						[0, 0, 0] as vec3
					)
					.map(
						(nSum: number) => nSum / vertexNormals[vIndices[i + 2] - 1].length
					);

				normals.push([...n1, ...n2, ...n3]);
			}
		});

		polygonGroup.normals = normals.flat();
		polygonGroup.positions = positions.flat();
	}

	genRoughNormals(verticesData: Array<number[]>, polygonGroup: IPolygonGroup) {
		const normals: Array<number[]> = [];
		const positions: Array<number[]> = [];

		polygonGroup.polygons.forEach((polygon) => {
			const vIndices = polygon.map((f) => parseInt(f.split('/')[0]));

			for (let i = 0; i < vIndices.length - 2; i++) {
				const p1 = verticesData[vIndices[0] - 1];
				const p2 = verticesData[vIndices[i + 1] - 1];
				const p3 = verticesData[vIndices[i + 2] - 1];
				positions.push(p1);
				positions.push(p2);
				positions.push(p3);

				const n = vec3.normalize(
					vec3.create(),
					vec3.cross(
						vec3.create(),
						vec3.subtract(vec3.create(), p2 as vec3, p1 as vec3),
						vec3.subtract(vec3.create(), p3 as vec3, p1 as vec3)
					)
				);

				normals.push([...n, ...n, ...n]);
			}
		});

		polygonGroup.normals = normals.flat();
		polygonGroup.positions = positions.flat();
	}

	generate() {
		if (this.geometries.length) {
			return this.geometries;
		}

		const lines = this.obj.split('\n');
		const parsedObj: IParsedObj = {
			vertices: [],
			normals: [],
			textureCoords: [],
			polygonGroups: [],
		};

		let currentGroup: IPolygonGroup = {
			name: 'default',
			smooth: false,
			polygons: [],
			positions: [],
			normals: [],
		};

		for (let i = 0; i < lines.length; i++) {
			if (/^\s*g\s+/.test(lines[i])) {
				const groupName =
					lines[i].match(/^\s*g\s+(?<groupName>.*)/).groups.groupName ||
					'default';

				if (groupName !== currentGroup.name) {
					if (parsedObj.polygonGroups.indexOf(currentGroup) === -1) {
						parsedObj.polygonGroups.push(currentGroup);
					}

					const existingGroup = parsedObj.polygonGroups.find(
						(group) => group.name === groupName
					);

					if (existingGroup) {
						currentGroup = existingGroup;
					} else {
						currentGroup = {
							name: groupName,
							smooth: false,
							polygons: [],
							normals: [],
							positions: [],
						};
					}
				}
			}

			if (/^\s*s\s+/.test(lines[i])) {
				const { smooth } = lines[i].match(/^\s*s\s+(?<smooth>.*)/).groups;

				if (smooth !== 'off') {
					currentGroup.smooth = true;
				}
			}

			if (/^\s*v\s+/.test(lines[i])) {
				parsedObj.vertices.push(
					lines[i]
						.match(/^\s*v\s+(?<coords>.*)/)
						.groups.coords.trim()
						.split(/\s+/)
						.map((str) => parseFloat(str))
				);
			}

			if (/^\s*vn\s+/.test(lines[i])) {
				parsedObj.normals.push(
					lines[i]
						.match(/^\s*vn\s+(?<coords>.*)/)
						.groups.coords.trim()
						.split(/\s+/)
						.map((str) => parseFloat(str))
				);
			}

			if (/^\s*f\s+/.test(lines[i])) {
				currentGroup.polygons.push(
					lines[i]
						.match(/^\s*f\s+(?<faces>.*)/)
						.groups.faces.trim()
						.split(/\s+/)
				);
			}
		}

		if (parsedObj.polygonGroups.indexOf(currentGroup) === -1) {
			parsedObj.polygonGroups.push(currentGroup);
		}

		parsedObj.polygonGroups.forEach((group) => {
			if (!group.polygons.length) {
				return;
			}

			group.smooth
				? this.genSmoothNormals(parsedObj.vertices, group)
				: this.genRoughNormals(parsedObj.vertices, group);

			const geometry = new Geometry();

			geometry.id = `${this.id}<${group.name}>`;
			geometry.name = group.name;
			geometry.positions = new Float32Array(group.positions);
			geometry.normals = new Float32Array(group.normals);
			geometry.textureCoords = new Float32Array([]);

			this.geometries.push(geometry);
		});

		return this.geometries;
	}

	findById(id: string) {
		if (!this.geometries.length) {
			this.generate();
		}

		const geometry = this.geometries.find((g) => g.id === id);

		if (!geometry) {
			const { groupName } = id.match(/(?<modelId>.*)<(?<groupName>.*)>/).groups;

			return Geometry.emtpy(id, groupName);
		}

		return geometry;
	}
}
