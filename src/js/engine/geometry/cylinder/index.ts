import { vec3 } from 'gl-matrix';
import Geometry from '../../standard/geometry';
import { getSegment } from '../helpers';
import { ICylinderConfig } from './types';

export default class Cylinder extends Geometry {
	config: ICylinderConfig;

	constructor(config: ICylinderConfig) {
		super();

		this.config = config;
		this.name = 'Cylinder';
		this.id = 'Cylinder';
	}

	getPoint(i: number, radius: number, y: number, segments: number): vec3 {
		return [
			radius * Math.cos((2 * Math.PI * i) / segments),
			y,
			radius * Math.sin((2 * Math.PI * i) / segments),
		];
	}

	getNormalsForSegment(a: vec3, b: vec3, c: vec3, d: vec3) {
		const nA = vec3.normalize(vec3.create(), vec3.fromValues(a[0], 0, a[2]));
		const nB = vec3.normalize(vec3.create(), vec3.fromValues(b[0], 0, b[2]));
		const nC = vec3.normalize(vec3.create(), vec3.fromValues(c[0], 0, c[2]));
		const nD = vec3.normalize(vec3.create(), vec3.fromValues(d[0], 0, d[2]));

		return [...nA, ...nD, ...nC, ...nA, ...nC, ...nB];
	}

	construct() {
		const positions = [];
		const normals = [];
		const textureCoords: number[] = [];

		for (let i = 0; i < this.config.segments; i++) {
			const p00 = this.getPoint(
				i,
				this.config.radius,
				this.config.height / 2,
				this.config.segments
			);
			const p01 = this.getPoint(
				i + 1 < this.config.segments ? i + 1 : 0,
				this.config.radius,
				this.config.height / 2,
				this.config.segments
			);
			const p10 = this.getPoint(
				i,
				this.config.radius,
				-this.config.height / 2,
				this.config.segments
			);
			const p11 = this.getPoint(
				i + 1 < this.config.segments ? i + 1 : 0,
				this.config.radius,
				-this.config.height / 2,
				this.config.segments
			);

			const vertex = getSegment(p00, p10, p11, p01);
			// base
			positions.push(vertex);
			normals.push(this.getNormalsForSegment(p00, p10, p11, p01));

			// top cap
			positions.push([...p01, ...p00, ...[0, this.config.height / 2, 0]]);
			normals.push([...[0, 1, 0], ...[0, 1, 0], ...[0, 1, 0]]);

			// bottom cap
			positions.push([...p10, ...p11, ...[0, -this.config.height / 2, 0]]);
			normals.push([...[0, -1, 0], ...[0, -1, 0], ...[0, -1, 0]]);
		}

		this.positions = new Float32Array(positions.flat());
		this.normals = new Float32Array(normals.flat());
		this.textureCoords = new Float32Array(textureCoords.flat());
	}
}
