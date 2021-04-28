import { vec3 } from 'gl-matrix';
import Mesh from '../../standard/mesh';
import { getSegment } from '../helpers';

export default class Sphere extends Mesh {
	constructor(
		gl,
		gameObject,
		{
			widthSegments,
			heightSegments,
			radius,
			color = [1, 1, 1],
			gap = 0,
			innerFacing = false,
			polygonal = false,
			texture,
			enableSpecular,
			specularStrength,
			enableLighting,
		}
	) {
		super(gl, gameObject, {
			enableSpecular,
			specularStrength,
			enableLighting,
		});

		this.widthSegments = widthSegments;
		this.heightSegments = heightSegments;
		this.radius = radius;
		this.gap = gap;
		this.color = color;
		this.innerFacing = innerFacing;
		this.polygonal = polygonal;
		this.texture = texture;

		this.setup();
	}

	setup() {
		const { normals, positions, textureCoords } = this.getGeometry();

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

	getPoint(i, j, width, height) {
		const longitude = ((i % width) / width) * 2 * Math.PI;
		const latitude = (j / height) * Math.PI;
		let point = [
			this.radius * Math.sin(latitude) * Math.cos(longitude),
			this.radius * Math.sin(latitude) * Math.sin(longitude),
			this.radius * Math.cos(latitude),
		];

		if (this.innerFacing) {
			point = [point[0], point[2], point[1]];
		}

		return point;
	}

	getNormalsForSegment(a, b, c, d) {
		if (this.polygonal) {
			const n = vec3.normalize(
				vec3.create(),
				vec3.cross(
					vec3.create(),
					vec3.subtract(vec3.create(), d, a),
					vec3.subtract(vec3.create(), vec3.exactEquals(b, a) ? c : b, a)
				)
			);
			// debugger;
			return [...n, ...n, ...n, ...n, ...n, ...n];
		}
		const nA = vec3.normalize(vec3.create(), a);
		const nB = vec3.normalize(vec3.create(), b);
		const nC = vec3.normalize(vec3.create(), c);
		const nD = vec3.normalize(vec3.create(), d);

		return [...nA, ...nD, ...nC, ...nA, ...nC, ...nB];
	}

	getTextureCoordsForSegment(a, b, c, d, cw = false) {
		return cw
			? [...a, ...c, ...d, ...a, ...b, ...c]
			: [...a, ...d, ...c, ...a, ...c, ...b];
	}

	getGeometry() {
		const positions = [];
		const normals = [];
		const textureCoords = [];
		for (let i = 0; i < this.widthSegments; i++) {
			for (let j = 0; j < this.heightSegments; j++) {
				const p00 = this.getPoint(
					i + this.gap,
					j + this.gap,
					this.widthSegments,
					this.heightSegments
				);
				const p10 = this.getPoint(
					i + 1 - this.gap,
					j + this.gap,
					this.widthSegments,
					this.heightSegments
				);
				const p01 = this.getPoint(
					i + this.gap,
					j + 1 - this.gap,
					this.widthSegments,
					this.heightSegments
				);
				const p11 = this.getPoint(
					i + 1 - this.gap,
					j + 1 - this.gap,
					this.widthSegments,
					this.heightSegments
				);
				const vertex = getSegment(p00, p10, p11, p01);
				normals.push(
					this.getNormalsForSegment(p00, p10, p11, p01, this.innerFacing)
				);
				positions.push(vertex);
				textureCoords.push(
					this.getTextureCoordsForSegment(
						[i / this.widthSegments, j / this.heightSegments],
						[(i + 1) / this.widthSegments, j / this.heightSegments],
						[(i + 1) / this.widthSegments, (j + 1) / this.heightSegments],
						[i / this.widthSegments, (j + 1) / this.heightSegments],
						this.innerFacing
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
