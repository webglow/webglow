import { vec3 } from 'gl-matrix';
import vertexSource from './shaders/vertex.glsl';
import fragmentSource from './shaders/fragment.glsl';
import { hexToRgb } from '../../helpers';
import GLProgram from '../../standard/gl-program';
import Transform from '../../standard/transform';
import HierarchyNode, { NODE_TYPE } from '../../standard/hierarchy/node';

export default class Primitive extends GLProgram {
	constructor(
		gl,
		scene,
		{
			enableLighting = true,
			enableSpecular = false,
			specularStrength = 80,
		} = {}
	) {
		super(gl);

		this.scene = scene;

		this.enableLighting = enableLighting;
		this.enableSpecular = enableSpecular;
		this.specularStrength = specularStrength;

		this.node = new HierarchyNode(this, false, null, NODE_TYPE.DRAWABLE);

		this.transform = new Transform();
	}

	createProgram(_vertexSource, _fragmentSource) {
		if (_vertexSource || _fragmentSource) {
			super.createProgram(_vertexSource, _fragmentSource);
			return;
		}

		super.createProgram(vertexSource, fragmentSource);
	}

	setupAttributes() {
		super.setupAttributes();

		this.buffers.position = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);

		this.attributes.position = this.gl.getAttribLocation(
			this.program,
			'aPosition'
		);

		this.gl.vertexAttribPointer(
			this.attributes.position,
			3,
			this.gl.FLOAT,
			false,
			0,
			0
		);
		this.gl.enableVertexAttribArray(this.attributes.position);

		this.buffers.normal = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.normal);

		this.attributes.normal = this.gl.getAttribLocation(this.program, 'aNormal');

		this.gl.vertexAttribPointer(
			this.attributes.normal,
			3,
			this.gl.FLOAT,
			false,
			0,
			0
		);
		this.gl.enableVertexAttribArray(this.attributes.normal);

		this.buffers.textureCoord = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.textureCoord);

		this.attributes.textureCoord = this.gl.getAttribLocation(
			this.program,
			'aTextureCoord'
		);

		this.gl.vertexAttribPointer(
			this.attributes.textureCoord,
			2,
			this.gl.FLOAT,
			false,
			0,
			0
		);
		this.gl.enableVertexAttribArray(this.attributes.textureCoord);
	}

	setupColor(color) {
		const texture = this.gl.createTexture();
		const textureUnit = this.scene.getFreeTextureUnit();
		this.gl.activeTexture(this.gl.TEXTURE0 + textureUnit);
		this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

		const level = 0;
		const width = 1;
		const height = 1;
		const border = 0;
		const format = this.gl.RGBA;
		const type = this.gl.UNSIGNED_BYTE;
		const data = new Uint8Array(color);
		this.gl.texImage2D(
			this.gl.TEXTURE_2D,
			level,
			format,
			width,
			height,
			border,
			format,
			type,
			data
		);

		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MIN_FILTER,
			this.gl.NEAREST
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MAG_FILTER,
			this.gl.NEAREST
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_S,
			this.gl.CLAMP_TO_EDGE
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_T,
			this.gl.CLAMP_TO_EDGE
		);

		this.setupTexture(textureUnit);
	}

	setupTexture(textureUnit) {
		this.setUniforms({
			uTexture: {
				type: 'uniform1i',
				value: [textureUnit],
			},
		});
	}

	setupUniforms() {
		super.setupUniforms();

		this.setUniforms({
			uEnableSpecular: {
				type: 'uniform1f',
				value: [this.enableSpecular],
			},
			uSpecularStrength: {
				type: 'uniform1f',
				value: [this.specularStrength],
			},
			uEnableLighting: {
				type: 'uniform1f',
				value: [this.enableLighting],
			},
			uShadeColor: {
				type: 'uniform3f',
				value: vec3.scale(vec3.create(), hexToRgb('#666666').vec3, 0.05),
			},
		});

		this.updateMatrix();
	}

	setupDirectionalLight(lightSources) {
		if (!lightSources || !lightSources.length) {
			return;
		}

		this.gl.useProgram(this.program);
		this.gl.bindVertexArray(this.vao);
		this.setUniforms({
			uDirectionalLight: {
				type: 'uniformMatrix3fv',
				value: [
					false,
					new Float32Array(lightSources.map((l) => l.toMat3Array()).flat()),
					0,
					lightSources.length * 3 * 3,
				],
			},
			uDirectionalLightNumber: {
				type: 'uniform1ui',
				value: [lightSources.length],
			},
		});
	}

	setupPointLight(lightSources) {
		if (!lightSources || !lightSources.length) {
			return;
		}

		this.gl.useProgram(this.program);
		this.gl.bindVertexArray(this.vao);
		this.setUniforms({
			uPointLight: {
				type: 'uniformMatrix3fv',
				value: [
					false,
					new Float32Array(lightSources.map((l) => l.toMat3Array()).flat()),
					0,
					lightSources.length * 3 * 3,
				],
			},
			uPointLightNumber: {
				type: 'uniform1ui',
				value: [lightSources.length],
			},
		});
	}

	updateMatrix() {
		const world = this.updateWorldMatrix();

		const uWorldViewProjection = this.transform.getWorldViewProjection(
			world,
			this.scene.sceneCamera
		);

		this.gl.useProgram(this.program);
		this.gl.bindVertexArray(this.vao);

		this.setUniforms({
			uWorldViewProjection: {
				type: 'uniformMatrix4fv',
				value: [false, uWorldViewProjection],
			},
		});

		return uWorldViewProjection;
	}

	updateWorldMatrix() {
		const uWorld = this.transform.getWorld(this.node);

		this.gl.useProgram(this.program);
		this.gl.bindVertexArray(this.vao);

		this.setUniforms({
			uWorld: {
				type: 'uniformMatrix4fv',
				value: [false, uWorld],
			},
			uWorldInverseTranspose: {
				type: 'uniformMatrix4fv',
				value: [false, uWorld],
			},
			uViewWorldPosition: {
				type: 'uniform3f',
				value: this.scene.sceneCamera.transform.vPosition,
			},
		});

		return uWorld;
	}
}
