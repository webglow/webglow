import { vec3 } from 'gl-matrix';
import { getSegment, getTextureCoordsForSegment } from '../helpers';
import Primitive from '../primitive';

export default class Plane extends Primitive {
	constructor(
		gl,
		scene,
		{
			width,
			length,
			widthSegments,
			lengthSegments,
			color = [1, 1, 1],
			gap = 0,
			texture,
			heightMap,
			enableLighting,
			enableSpecular,
			specularStrength,
		}
	) {
		super(gl, scene, {
			enableLighting,
			enableSpecular,
			specularStrength,
		});

		this.heightMap =
			heightMap ||
			new Array((widthSegments + 1) * (lengthSegments + 1)).fill(0);

		this.width = width;
		this.length = length;
		this.widthSegments = widthSegments;
		this.lengthSegments = lengthSegments;
		this.gap = gap;
		this.color = color;
		this.texture = texture;

		this.setup();
	}

	setup() {
		super.setupProgram();

		const { vertices, normals, textureCoords } = this.getVertices();

		this.aPositions = new Float32Array(vertices);
		this.aNormals = new Float32Array(normals);
		this.aTextureCoords = new Float32Array(textureCoords);

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

		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.textureCoord);
		this.gl.bufferData(
			this.gl.ARRAY_BUFFER,
			this.aTextureCoords,
			this.gl.STATIC_DRAW
		);

		if (typeof this.texture === 'number') {
			this.setupTexture(this.texture);
		} else {
			this.setupColor(this.color);
		}
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
				vec3.subtract(vec3.create(), p01, p00),
				vec3.subtract(vec3.create(), p10, p00)
			)
		);
		return [...n, ...n, ...n, ...n, ...n, ...n];
	}

	getVertices() {
		const vertices = [];
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
				];
				const p10 = [
					(x + 1) * segmentWidth - this.gap,
					this.heightMap[j * this.widthSegments + (i + 1)],
					y * segmentLength + this.gap,
				];
				const p11 = [
					(x + 1) * segmentWidth - this.gap,
					this.heightMap[(j + 1) * this.widthSegments + (i + 1)],
					(y + 1) * segmentLength - this.gap,
				];
				const p01 = [
					x * segmentWidth + this.gap,
					this.heightMap[(j + 1) * this.widthSegments + i],
					(y + 1) * segmentLength - this.gap,
				];
				vertices.push(getSegment(p00, p10, p11, p01));

				normals.push(this.getNormalsForSegment(p00, p01, p10));

				textureCoords.push(getTextureCoordsForSegment());
			}
		}

		return {
			vertices: vertices.flat(),
			normals: normals.flat(),
			textureCoords: textureCoords.flat(),
		};
	}
}
