import EngineGlobals from 'engine/globals';
import { IMeshJSON } from 'engine/standard/mesh/types';
import GameObject from 'engine/utils/game-object';
import VAO from 'engine/utils/vao';
import Geometry from '../geometry';

export default class Mesh {
	attribLocations: {
		[key: string]: number;
	};

	vao: VAO;
	gameObject: GameObject;
	texture: WebGLTexture;

	geometry: Geometry;

	constructor(gameObject: GameObject, geometry: Geometry) {
		this.attribLocations = {
			aPosition: 0,
			aNormal: 1,
			aTextureCoord: 2,
		};

		this.vao = new VAO(this.attribLocations);
		this.gameObject = gameObject;

		this.setupAttributes();

		this.geometry = geometry;
		this.geometry.construct();

		this.setPositions();
		this.setNormals();
		this.setTextureCoords();
	}

	toJSON(): IMeshJSON {
		return {
			geometryId: this.geometry.id,
		};
	}

	static fromJSON(gameObject: GameObject, { geometryId }: IMeshJSON) {
		return new Mesh(gameObject, EngineGlobals.geometryPool.get(geometryId));
	}

	setupAttributes() {
		this.vao.setAttribute('aPosition', 3, EngineGlobals.gl.FLOAT);
		this.vao.setAttribute('aNormal', 3, EngineGlobals.gl.FLOAT);
		this.vao.setAttribute('aTextureCoord', 2, EngineGlobals.gl.FLOAT);
	}

	setPositions() {
		this.vao.setBufferData('aPosition', this.geometry.positions);
	}

	setNormals() {
		this.vao.setBufferData('aNormal', this.geometry.normals);
	}

	setTextureCoords() {
		this.vao.setBufferData('aTextureCoord', this.geometry.textureCoords);
	}

	draw() {
		EngineGlobals.gl.drawArrays(
			EngineGlobals.gl.TRIANGLES,
			0,
			this.geometry.positions.length / 3
		);
	}
}
