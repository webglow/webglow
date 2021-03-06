import { vec3 } from 'gl-matrix';
import {
	getSegment,
	getTextureCoordsForSegment,
} from 'engine/geometry/helpers';
import { IPlaneConfig } from './types';
import Geometry from '../../standard/geometry';

export default class Plane extends Geometry {
	config: IPlaneConfig;
	heightMap: Array<number>;

	constructor(config: IPlaneConfig) {
		super();

		this.heightMap =
			config.heightMap ||
			new Array((config.widthSegments + 1) * (config.lengthSegments + 1)).fill(
				0
			);
		this.config = config;
		this.name = 'Plane';
		this.id = 'Plane';
	}

	getNormalsForSegment(p00: vec3, p01: vec3, p10: vec3) {
		const n = vec3.normalize(
			vec3.create(),
			vec3.cross(
				vec3.create(),
				vec3.subtract(vec3.create(), p01, p00),
				vec3.subtract(vec3.create(), p10, p00)
			)
		);
		return [...n, ...n, ...n, ...n, ...n, ...n];
	}

	construct() {
		const positions = [];
		const normals = [];
		const textureCoords = [];
		const segmentWidth = this.config.width / this.config.widthSegments;
		const segmentLength = this.config.length / this.config.lengthSegments;

		for (let i = 0; i < this.config.widthSegments; i++) {
			for (let j = 0; j < this.config.lengthSegments; j++) {
				const x = i - this.config.widthSegments / 2;
				const y = j - this.config.lengthSegments / 2;

				const p00 = [
					x * segmentWidth,
					this.heightMap[j * this.config.widthSegments + i],
					y * segmentLength,
				] as vec3;
				const p10 = [
					(x + 1) * segmentWidth,
					this.heightMap[j * this.config.widthSegments + (i + 1)],
					y * segmentLength,
				] as vec3;
				const p11 = [
					(x + 1) * segmentWidth,
					this.heightMap[(j + 1) * this.config.widthSegments + (i + 1)],
					(y + 1) * segmentLength,
				] as vec3;
				const p01 = [
					x * segmentWidth,
					this.heightMap[(j + 1) * this.config.widthSegments + i],
					(y + 1) * segmentLength,
				] as vec3;
				positions.push(getSegment(p00, p10, p11, p01));

				normals.push(this.getNormalsForSegment(p00, p01, p10));

				textureCoords.push(getTextureCoordsForSegment());
			}
		}

		this.positions = new Float32Array(positions.flat());
		this.normals = new Float32Array(normals.flat());
		this.textureCoords = new Float32Array(textureCoords.flat());
	}
}
