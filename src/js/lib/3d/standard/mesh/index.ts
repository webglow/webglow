import GameObject from '../../../utils/game-object';
import VAO from '../../../utils/vao';

export default class Mesh {
	gl: WebGL2RenderingContext;
	attribLocations: {
		[key: string]: number;
	};

	vao: VAO;
	gameObject: GameObject;
	texture: WebGLTexture;

	constructor(
		gl: WebGL2RenderingContext,
		gameObject: GameObject,
		config?: any
	) {
		this.gl = gl;

		this.attribLocations = {
			aPosition: 0,
			aNormal: 1,
			aTextureCoord: 2,
		};

		this.vao = new VAO(this.gl, this.attribLocations);
		this.gameObject = gameObject;

		this.setupAttributes();
	}

	setupAttributes() {
		this.vao.setAttribute('aPosition', 3, this.gl.FLOAT);
		this.vao.setAttribute('aNormal', 3, this.gl.FLOAT);
		this.vao.setAttribute('aTextureCoord', 2, this.gl.FLOAT);
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
