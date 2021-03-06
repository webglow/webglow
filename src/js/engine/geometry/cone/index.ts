import { vec3 } from 'gl-matrix';
import Geometry from '../../standard/geometry';
import { IConeConfig } from './types';

export default class Cone extends Geometry {
	config: IConeConfig;

	constructor(config: IConeConfig) {
		super();

		this.config = config;
		this.name = 'Cone';
		this.id = 'Cone';
	}

	getPoint(i: number, radius: number, y: number, segments: number): vec3 {
		return [
			radius * Math.cos((2 * Math.PI * i) / segments),
			y,
			radius * Math.sin((2 * Math.PI * i) / segments),
		];
	}

	construct() {
		const positions = [];
		const normals = [];
		const textureCoords: number[] = [];

		for (let i = 0; i < this.config.segments; i++) {
			const p00 = this.getPoint(
				i,
				this.config.radius,
				-this.config.height / 2,
				this.config.segments
			);
			const p01 = this.getPoint(
				i + 1 < this.config.segments ? i + 1 : 0,
				this.config.radius,
				-this.config.height / 2,
				this.config.segments
			);

			positions.push([...p01, ...p00, ...[0, this.config.height / 2, 0]]);
			normals.push([
				...vec3.normalize(vec3.create(), vec3.fromValues(p01[0], 0, p01[2])),
				...vec3.normalize(vec3.create(), vec3.fromValues(p00[0], 0, p00[2])),
				...[0, 1, 0],
			]);

			// bottom cap
			positions.push([...p00, ...p01, ...[0, -this.config.height / 2, 0]]);
			normals.push([...[0, -1, 0], ...[0, -1, 0], ...[0, -1, 0]]);
		}

		this.positions = new Float32Array(positions.flat());
		this.normals = new Float32Array(normals.flat());
		this.textureCoords = new Float32Array(textureCoords.flat());
	}
}
