import { vec2, vec3 } from 'gl-matrix';
import EngineGlobals from 'engine/globals';
import GameObject from 'engine/utils/game-object';
import Mesh from 'engine/standard/mesh';
import { getSegment } from 'engine/primitives/helpers';
import { ISphereConfig, ISphereJSON } from './types';
import { MF } from '../../utils/constants';

export default class Sphere extends Mesh {
	positions: Float32Array;
	normals: Float32Array;
	textureCoords: Float32Array;
	widthSegments: number;
	heightSegments: number;
	radius: number;
	polygonal: boolean;

	constructor(
		gameObject: GameObject,
		{ widthSegments, heightSegments, radius, polygonal = false }: ISphereConfig
	) {
		super(gameObject);

		this.widthSegments = widthSegments;
		this.heightSegments = heightSegments;
		this.radius = radius * MF;
		this.polygonal = polygonal;

		this.setup();
	}

	toJSON(): ISphereJSON {
		return {
			type: 'Sphere',
			widthSegments: this.widthSegments,
			heightSegments: this.heightSegments,
			radius: this.radius / MF,
			polygonal: this.polygonal,
		};
	}

	static fromJSON(gameObject: GameObject, json: ISphereJSON): Sphere {
		return new Sphere(gameObject, json);
	}

	setup() {
		const { normals, positions, textureCoords } = this.getGeometry();

		this.positions = new Float32Array(positions);
		this.normals = new Float32Array(normals);
		this.textureCoords = new Float32Array(textureCoords);

		this.setPositions(this.positions);
		this.setNormals(this.normals);
		this.setTextureCoords(this.textureCoords);
	}

	draw() {
		EngineGlobals.gl.drawArrays(
			EngineGlobals.gl.TRIANGLES,
			0,
			this.positions.length / 3
		);
	}

	getPoint(i: number, j: number, width: number, height: number): vec3 {
		const longitude = ((i % width) / width) * 2 * Math.PI;
		const latitude = (j / height) * Math.PI;
		const point = [
			this.radius * Math.sin(latitude) * Math.cos(longitude),
			this.radius * Math.sin(latitude) * Math.sin(longitude),
			this.radius * Math.cos(latitude),
		];

		return point as vec3;
	}

	getNormalsForSegment(a: vec3, b: vec3, c: vec3, d: vec3) {
		if (this.polygonal) {
			const n = vec3.normalize(
				vec3.create(),
				vec3.cross(
					vec3.create(),
					vec3.subtract(vec3.create(), d, a),
					vec3.subtract(vec3.create(), vec3.exactEquals(b, a) ? c : b, a)
				)
			);

			return [...n, ...n, ...n, ...n, ...n, ...n];
		}
		const nA = vec3.normalize(vec3.create(), a);
		const nB = vec3.normalize(vec3.create(), b);
		const nC = vec3.normalize(vec3.create(), c);
		const nD = vec3.normalize(vec3.create(), d);

		return [...nA, ...nD, ...nC, ...nA, ...nC, ...nB];
	}

	getTextureCoordsForSegment(a: vec2, b: vec2, c: vec2, d: vec2) {
		return [...a, ...d, ...c, ...a, ...c, ...b];
	}

	getGeometry() {
		const positions = [];
		const normals = [];
		const textureCoords = [];
		for (let i = 0; i < this.widthSegments; i++) {
			for (let j = 0; j < this.heightSegments; j++) {
				const p00 = this.getPoint(
					i,
					j,
					this.widthSegments,
					this.heightSegments
				);
				const p10 = this.getPoint(
					i + 1,
					j,
					this.widthSegments,
					this.heightSegments
				);
				const p01 = this.getPoint(
					i,
					j,
					this.widthSegments,
					this.heightSegments
				);
				const p11 = this.getPoint(
					i + 1,
					j + 1,
					this.widthSegments,
					this.heightSegments
				);
				const vertex = getSegment(p00, p10, p11, p01);
				normals.push(this.getNormalsForSegment(p00, p10, p11, p01));
				positions.push(vertex);
				textureCoords.push(
					this.getTextureCoordsForSegment(
						[i / this.widthSegments, j / this.heightSegments],
						[(i + 1) / this.widthSegments, j / this.heightSegments],
						[(i + 1) / this.widthSegments, (j + 1) / this.heightSegments],
						[i / this.widthSegments, (j + 1) / this.heightSegments]
					)
				);
			}
		}

		return {
			positions: positions.flat(),
			normals: normals.flat(),
			textureCoords: textureCoords.flat(),
		};
	}
}
