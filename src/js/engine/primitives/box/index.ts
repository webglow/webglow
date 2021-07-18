import { vec3 } from 'gl-matrix';
import { MF } from 'engine/utils/constants';
import {
	getSegment,
	getTextureCoordsForSegment,
} from 'engine/primitives/helpers';
import { IBoxConfig } from './types';
import { IGeometry } from '../../standard/geometry';

export default class Box implements IGeometry {
	config: IBoxConfig;

	constructor(config: IBoxConfig) {
		this.config = config;
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
	getGeometry() {
		const halfSize = vec3.scale(vec3.create(), this.config.size, MF / 2);
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
			...getSegment(p000, p001, p101, p100),

			// front
			...getSegment(p011, p111, p101, p001),

			// top
			...getSegment(p010, p110, p111, p011),

			// left
			...getSegment(p010, p011, p001, p000),

			// right
			...getSegment(p111, p110, p100, p101),

			// back
			...getSegment(p110, p010, p000, p100),
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
				...getTextureCoordsForSegment(),
				...getTextureCoordsForSegment(),
				...getTextureCoordsForSegment(),
				...getTextureCoordsForSegment(),
				...getTextureCoordsForSegment(),
				...getTextureCoordsForSegment(),
			]
		};
	}
	/* eslint-enable array-bracket-spacing */
	/* eslint-enable no-multi-spaces */
}
