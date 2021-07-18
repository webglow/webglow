import EngineGlobals from 'engine/globals';
import { IMeshJSON } from 'engine/standard/mesh/types';
import GameObject from 'engine/utils/game-object';
import VAO from 'engine/utils/vao';
import { IGeometry } from '../geometry';

export default class Mesh {
	attribLocations: {
		[key: string]: number;
	};

	name: string;
	vao: VAO;
	gameObject: GameObject;
	texture: WebGLTexture;

	positions: Float32Array;
	normals: Float32Array;
	textureCoords: Float32Array;

	constructor(
		gameObject: GameObject,
		geometry: IGeometry | null,
		name?: string,
		positions?: number[],
		normals?: number[],
		textureCoords?: number[]
	) {
		this.attribLocations = {
			aPosition: 0,
			aNormal: 1,
			aTextureCoord: 2,
		};

		this.vao = new VAO(this.attribLocations);
		this.gameObject = gameObject;

		this.setupAttributes();

		if (name) {
			this.name = name;
		}

		if (geometry) {
			this.constructGeometry(geometry);
			this.name = geometry.constructor.name;
		} else if (positions && normals && textureCoords) {
			this.setGeometry(positions, normals, textureCoords);
		} else {
			throw new Error('Mesh: Invalid constructor parameters');
		}
	}

	toJSON(): IMeshJSON {
		return {
			name: this.name,
			positions: Array.from(this.positions),
			normals: Array.from(this.normals),
			textureCoords: Array.from(this.textureCoords),
		};
	}

	static fromJSON(
		gameObject: GameObject,
		{ name, positions, normals, textureCoords }: IMeshJSON
	) {
		return new Mesh(gameObject, null, name, positions, normals, textureCoords);
	}

	constructGeometry(geometry: IGeometry) {
		const geometryData = geometry.getGeometry();

		this.positions = new Float32Array(geometryData.positions);
		this.normals = new Float32Array(geometryData.normals);
		this.textureCoords = new Float32Array(geometryData.textureCoords);

		this.setPositions(this.positions);
		this.setNormals(this.normals);
		this.setTextureCoords(this.textureCoords);
	}

	setGeometry(positions: number[], normals: number[], textureCoords: number[]) {
		this.positions = new Float32Array(positions);
		this.normals = new Float32Array(normals);
		this.textureCoords = new Float32Array(textureCoords);

		this.setPositions(this.positions);
		this.setNormals(this.normals);
		this.setTextureCoords(this.textureCoords);
	}

	setupAttributes() {
		this.vao.setAttribute('aPosition', 3, EngineGlobals.gl.FLOAT);
		this.vao.setAttribute('aNormal', 3, EngineGlobals.gl.FLOAT);
		this.vao.setAttribute('aTextureCoord', 2, EngineGlobals.gl.FLOAT);
	}

	setPositions(positions: Float32Array) {
		this.vao.setBufferData('aPosition', positions);
	}

	setNormals(normals: Float32Array) {
		this.vao.setBufferData('aNormal', normals);
	}

	setTextureCoords(textureCoords: Float32Array) {
		this.vao.setBufferData('aTextureCoord', textureCoords);
	}

	draw() {
		EngineGlobals.gl.drawArrays(
			EngineGlobals.gl.TRIANGLES,
			0,
			this.positions.length / 3
		);
	}
}
