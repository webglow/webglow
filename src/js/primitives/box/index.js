import { vec3 } from 'gl-matrix';
import { getSegment } from '../helpers';
import Primitive from '../primitive';

export default class Box extends Primitive {
	constructor(
		gl,
		name,
		{
			size = [1, 1, 1],
			colors,
			enableSpecular,
			specularStrength,
			enableLighting,
		}
	) {
		super(gl, name, { enableSpecular, specularStrength, enableLighting });

		this.colors = colors;
		this.size = size;

		this.setup();
	}

	setup() {
		super.setupProgram();

		const { vertices, normals } = this.getVertices(this.size);
		this.aPositions = new Float32Array(vertices);
		this.aNormals = new Float32Array(normals);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);
		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			this.aPositions,
			this.gl.STATIC_DRAW
		);

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.normal);
		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			this.aNormals,
			this.gl.STATIC_DRAW
		);

		this.aColors = new Float32Array(this.aPositions.length);

		for (let i = 0; i < this.aColors.length; i++) {
			this.aColors[i] = this.colors[parseInt(i / 18)][i % 3];
		}

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.color);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, this.aColors, this.gl.STATIC_DRAW);
	}

	draw() {
		super.draw();

		this.updateMatrix();

		this.gl.drawArrays(this.gl.TRIANGLES, 0, this.aPositions.length / 3);
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
	getVertices(size) {
		const p000 = [-size[0], -size[1], -size[2]];
		const p100 = [ size[0], -size[1], -size[2]];
		const p101 = [ size[0], -size[1],  size[2]];
		const p001 = [-size[0], -size[1],  size[2]];
		const p010 = [-size[0],  size[1], -size[2]];
		const p110 = [ size[0],  size[1], -size[2]];
		const p111 = [ size[0],  size[1],  size[2]];
		const p011 = [-size[0],  size[1],  size[2]];

		return {
			vertices: [
			// bottom
			...getSegment(p000, p001, p101, p100),

			// front
			...getSegment(p001, p011, p111, p101),

			// top
			...getSegment(p111, p011, p010, p110),

			// left
			...getSegment(p010, p011, p001, p000),

			// right
			...getSegment(p111, p110, p100, p101),

			// back
			...getSegment(p010, p000, p100, p110),
			],
			normals: [
				...this.getNormalsForSegment(p000, p001, p101),
				...this.getNormalsForSegment(p001, p011, p111),
				...this.getNormalsForSegment(p111, p011, p010),
				...this.getNormalsForSegment(p010, p011, p001),
				...this.getNormalsForSegment(p111, p110, p100),
				...this.getNormalsForSegment(p010, p000, p100),
			]
		};
	}
	/* eslint-enable array-bracket-spacing */
	/* eslint-enable no-multi-spaces */
}
