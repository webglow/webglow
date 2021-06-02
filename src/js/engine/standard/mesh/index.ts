import EngineGlobals from 'engine/globals';
import GameObject from 'engine/utils/game-object';
import VAO from 'engine/utils/vao';

export default class Mesh {
	attribLocations: {
		[key: string]: number;
	};

	vao: VAO;
	gameObject: GameObject;
	texture: WebGLTexture;

	constructor(gameObject: GameObject, config?: any) {
		this.attribLocations = {
			aPosition: 0,
			aNormal: 1,
			aTextureCoord: 2,
		};

		this.vao = new VAO(this.attribLocations);
		this.gameObject = gameObject;

		this.setupAttributes();
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

	draw() {}
}
