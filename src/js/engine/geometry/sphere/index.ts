import { vec2, vec3 } from 'gl-matrix';
import { getSegment } from 'engine/geometry/helpers';
import { ISphereConfig } from './types';
import Geometry from '../../standard/geometry';

export default class Sphere extends Geometry {
	config: ISphereConfig;

	constructor(config: ISphereConfig) {
		super();

		this.config = config;
		this.name = 'Sphere';
		this.id = 'Sphere';
	}

	getPoint(i: number, j: number, width: number, height: number): vec3 {
		const longitude = ((i % width) / width) * 2 * Math.PI;
		const latitude = (j / height) * Math.PI;
		const point = [
			this.config.radius * Math.sin(latitude) * Math.cos(longitude),
			this.config.radius * Math.sin(latitude) * Math.sin(longitude),
			this.config.radius * Math.cos(latitude),
		];

		return point as vec3;
	}

	getNormalsForSegment(a: vec3, b: vec3, c: vec3, d: vec3) {
		if (this.config.polygonal) {
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

	construct() {
		const positions = [];
		const normals = [];
		const textureCoords = [];
		for (let i = 0; i < this.config.widthSegments; i++) {
			for (let j = 0; j < this.config.heightSegments; j++) {
				const p00 = this.getPoint(
					i,
					j,
					this.config.widthSegments,
					this.config.heightSegments
				);
				const p10 = this.getPoint(
					i + 1,
					j,
					this.config.widthSegments,
					this.config.heightSegments
				);
				const p01 = this.getPoint(
					i,
					j + 1,
					this.config.widthSegments,
					this.config.heightSegments
				);
				const p11 = this.getPoint(
					i + 1,
					j + 1,
					this.config.widthSegments,
					this.config.heightSegments
				);
				const vertex = getSegment(p00, p10, p11, p01);
				normals.push(this.getNormalsForSegment(p00, p10, p11, p01));
				positions.push(vertex);
				textureCoords.push(
					this.getTextureCoordsForSegment(
						[i / this.config.widthSegments, j / this.config.heightSegments],
						[
							(i + 1) / this.config.widthSegments,
							j / this.config.heightSegments,
						],
						[
							(i + 1) / this.config.widthSegments,
							(j + 1) / this.config.heightSegments,
						],
						[
							i / this.config.widthSegments,
							(j + 1) / this.config.heightSegments,
						]
					)
				);
			}
		}

		this.positions = new Float32Array(positions.flat());
		this.normals = new Float32Array(normals.flat());
		this.textureCoords = new Float32Array(textureCoords.flat());
	}
}
