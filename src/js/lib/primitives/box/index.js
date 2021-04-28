import { vec3 } from 'gl-matrix';
import Mesh from '../../standard/mesh';
import { getSegment, getTextureCoordsForSegment } from '../helpers';

export default class Box extends Mesh {
	constructor(
		gl,
		gameObject,
		{
			size = [1, 1, 1],
			color,
			enableSpecular,
			specularStrength,
			texture,
			innerFacing = false,
			enableLighting,
		}
	) {
		super(gl, gameObject, {
			enableSpecular,
			specularStrength,
			enableLighting,
		});

		this.color = color;
		this.size = size;
		this.innerFacing = innerFacing;
		this.texture = texture;

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

		if (typeof this.texture === 'number') {
			this.setupTexture(this.texture);
		} else {
			this.setupColor(this.color);
		}
	}

	draw(...args) {
		super.draw(...args);

		this.gl.drawArrays(this.gl.TRIANGLES, 0, this.positions.length / 3);
	}

	getNormalsForSegment(p00, p01, p10) {
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
	getGeometry(size) {
		const halfSize = vec3.scale(vec3.create(), size, 0.5);
		const p000 = [-halfSize[0], -halfSize[1], -halfSize[2]];
		const p100 = [ halfSize[0], -halfSize[1], -halfSize[2]];
		const p101 = [ halfSize[0], -halfSize[1],  halfSize[2]];
		const p001 = [-halfSize[0], -halfSize[1],  halfSize[2]];
		const p010 = [-halfSize[0],  halfSize[1], -halfSize[2]];
		const p110 = [ halfSize[0],  halfSize[1], -halfSize[2]];
		const p111 = [ halfSize[0],  halfSize[1],  halfSize[2]];
		const p011 = [-halfSize[0],  halfSize[1],  halfSize[2]];

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
