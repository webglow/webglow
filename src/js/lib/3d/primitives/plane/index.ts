import { vec3 } from 'gl-matrix';
import { MF } from '../../../utils/constants';
import GameObject from '../../../utils/game-object';
import Mesh from '../../standard/mesh';
import { getSegment, getTextureCoordsForSegment } from '../helpers';
import { IPlaneConfig } from './types';

export default class Plane extends Mesh {
	positions: Float32Array;
	normals: Float32Array;
	textureCoords: Float32Array;
	width: number;
	length: number;
	widthSegments: number;
	lengthSegments: number;
	gap: number;
	heightMap: Array<number>;

	constructor(
		gl: WebGL2RenderingContext,
		gameObject: GameObject,
		{
			width,
			length,
			widthSegments,
			lengthSegments,
			gap = 0,
			heightMap,
		}: IPlaneConfig
	) {
		super(gl, gameObject);

		this.heightMap =
			heightMap ||
			new Array((widthSegments + 1) * (lengthSegments + 1)).fill(0);

		this.width = width * MF;
		this.length = length * MF;
		this.widthSegments = widthSegments;
		this.lengthSegments = lengthSegments;
		this.gap = gap;

		this.setup();
	}

	setup() {
		const { positions, normals, textureCoords } = this.getGeometry();

		this.positions = new Float32Array(positions);
		this.normals = new Float32Array(normals);
		this.textureCoords = new Float32Array(textureCoords);

		this.setPositions(this.positions);
		this.setNormals(this.normals);
		this.setTextureCoords(this.textureCoords);
	}

	draw() {
		this.gl.drawArrays(this.gl.TRIANGLES, 0, this.positions.length / 3);
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

	getGeometry() {
		const positions = [];
		const normals = [];
		const textureCoords = [];
		const segmentWidth = this.width / this.widthSegments;
		const segmentLength = this.length / this.lengthSegments;

		for (let i = 0; i < this.widthSegments; i++) {
			for (let j = 0; j < this.lengthSegments; j++) {
				const x = i - this.widthSegments / 2;
				const y = j - this.lengthSegments / 2;

				const p00 = [
					x * segmentWidth + this.gap,
					this.heightMap[j * this.widthSegments + i],
					y * segmentLength + this.gap,
				] as vec3;
				const p10 = [
					(x + 1) * segmentWidth - this.gap,
					this.heightMap[j * this.widthSegments + (i + 1)],
					y * segmentLength + this.gap,
				] as vec3;
				const p11 = [
					(x + 1) * segmentWidth - this.gap,
					this.heightMap[(j + 1) * this.widthSegments + (i + 1)],
					(y + 1) * segmentLength - this.gap,
				] as vec3;
				const p01 = [
					x * segmentWidth + this.gap,
					this.heightMap[(j + 1) * this.widthSegments + i],
					(y + 1) * segmentLength - this.gap,
				] as vec3;
				positions.push(getSegment(p00, p10, p11, p01));

				normals.push(this.getNormalsForSegment(p00, p01, p10));

				textureCoords.push(getTextureCoordsForSegment());
			}
		}

		return {
			positions: positions.flat(),
			normals: normals.flat(),
			textureCoords: textureCoords.flat(),
		};
	}
}
