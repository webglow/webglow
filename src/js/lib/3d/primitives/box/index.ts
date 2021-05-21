import { vec3 } from 'gl-matrix';
import EngineGlobals from '../../../../globals';
import { MF } from '../../../utils/constants';
import GameObject from '../../../utils/game-object';
import Mesh from '../../standard/mesh';
import { getSegment, getTextureCoordsForSegment } from '../helpers';
import { IBoxConfig } from './types';

export default class Box extends Mesh {
	innerFacing: boolean;
	size: vec3;
	positions: Float32Array;
	normals: Float32Array;
	textureCoords: Float32Array;

	constructor(
		gameObject: GameObject,
		{ size = [1, 1, 1], innerFacing = false }: IBoxConfig
	) {
		super(gameObject);

		this.size = size as vec3;
		this.innerFacing = innerFacing;

		this.setup();
	}

	setup() {
		const { positions, normals, textureCoords } = this.getGeometry(this.size);
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

	getNormalsForSegment(p00: vec3, p01: vec3, p10: vec3) {
		const n = vec3.normalize(
			vec3.create(),
			vec3.cross(
				vec3.create(),
				vec3.subtract(vec3.create(), p10, p00),
				vec3.subtract(vec3.create(), p01, p00)
			)
		);
		return [...n, ...n, ...n, ...n, ...n, ...n];
	}

	// prettier-ignore
	/* eslint-disable array-bracket-spacing */
	/* eslint-disable no-multi-spaces */
	getGeometry(size: vec3) {
		const halfSize = vec3.scale(vec3.create(), size, MF / 2);
		const p000 = [-halfSize[0], -halfSize[1], -halfSize[2]] as vec3;
		const p100 = [ halfSize[0], -halfSize[1], -halfSize[2]] as vec3;
		const p101 = [ halfSize[0], -halfSize[1],  halfSize[2]] as vec3;
		const p001 = [-halfSize[0], -halfSize[1],  halfSize[2]] as vec3;
		const p010 = [-halfSize[0],  halfSize[1], -halfSize[2]] as vec3;
		const p110 = [ halfSize[0],  halfSize[1], -halfSize[2]] as vec3;
		const p111 = [ halfSize[0],  halfSize[1],  halfSize[2]] as vec3;
		const p011 = [-halfSize[0],  halfSize[1],  halfSize[2]] as vec3;

		return {
			positions: [
			// bottom
			...getSegment(p000, p001, p101, p100, this.innerFacing),

			// front
			...getSegment(p011, p111, p101, p001, this.innerFacing),

			// top
			...getSegment(p010, p110, p111, p011, this.innerFacing),

			// left
			...getSegment(p010, p011, p001, p000, this.innerFacing),

			// right
			...getSegment(p111, p110, p100, p101, this.innerFacing),

			// back
			...getSegment(p110, p010, p000, p100, this.innerFacing),
			],
			normals: [
				...this.getNormalsForSegment(p000, p001, p101),
				...this.getNormalsForSegment(p001, p011, p111),
				...this.getNormalsForSegment(p111, p011, p010),
				...this.getNormalsForSegment(p010, p011, p001),
				...this.getNormalsForSegment(p111, p110, p100),
				...this.getNormalsForSegment(p010, p000, p100),
			],
			textureCoords: [
				...getTextureCoordsForSegment(this.innerFacing),
				...getTextureCoordsForSegment(this.innerFacing),
				...getTextureCoordsForSegment(this.innerFacing),
				...getTextureCoordsForSegment(this.innerFacing),
				...getTextureCoordsForSegment(this.innerFacing),
				...getTextureCoordsForSegment(this.innerFacing),
			]
		};
	}
	/* eslint-enable array-bracket-spacing */
	/* eslint-enable no-multi-spaces */
}
