import { vec3 } from 'gl-matrix';
import defaultVertexSource from './shaders/default/vertex.glsl';
import defaultFragmentSource from './shaders/default/fragment.glsl';
import depthVertexSource from './shaders/depth/vertex.glsl';
import depthFragmentSource from './shaders/depth/fragment.glsl';
import { hexToRgb } from '../../helpers';
import GLProgram from '../gl-program';

export default class Mesh {
	constructor(
		gl,
		gameObject,
		{
			enableLighting = true,
			enableSpecular = false,
			specularStrength = 80,
		} = {}
	) {
		/** @type {WebGL2RenderingContext} */
		this.gl = gl;

		this.programs = {
			default: new GLProgram(
				this.gl,
				defaultVertexSource,
				defaultFragmentSource
			),
		};
		this.gameObject = gameObject;

		this.enableLighting = enableLighting;
		this.enableSpecular = enableSpecular;
		this.specularStrength = specularStrength;

		this.setupAttributes();
		this.setupUniforms();
	}

	setupAttributes() {
		this.programs.default.setAttribute('aPosition', 3, this.gl.FLOAT);
		this.programs.default.setAttribute('aNormal', 3, this.gl.FLOAT);
		this.programs.default.setAttribute('aTextureCoord', 2, this.gl.FLOAT);
	}

	setPositions(positions) {
		this.programs.default.setBufferData('aPosition', positions);
	}

	setNormals(normals) {
		this.programs.default.setBufferData('aNormal', normals);
	}

	setTextureCoords(textureCoords) {
		this.programs.default.setBufferData('aTextureCoord', textureCoords);
	}

	setupColor(color) {
		this.texture = this.gl.createTexture();
		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

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

		this.setupTexture(0);
	}

	setupTexture(textureUnit) {
		this.programs.default.setUniforms({
			uTexture: {
				type: 'uniform1i',
				value: [textureUnit],
			},
		});
	}

	setupUniforms() {
		this.programs.default.setUniforms({
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
	}

	setupDirectionalLight(lightSources) {
		if (!lightSources || !lightSources.length) {
			return;
		}

		this.programs.default.setUniforms({
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

		this.programs.default.setUniforms({
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

	updateMatrix(mProjection, viewWorldPosition, pov) {
		const world = this.updateWorldMatrix(viewWorldPosition);

		const uWorldViewProjection = this.gameObject.transform.getWorldViewProjection(
			world,
			mProjection,
			pov
		);

		this.programs.default.setUniforms({
			uWorldViewProjection: {
				type: 'uniformMatrix4fv',
				value: [false, uWorldViewProjection],
			},
		});

		return uWorldViewProjection;
	}

	updateWorldMatrix(viewWorldPosition) {
		const uWorld = this.gameObject.transform.getWorld(this.gameObject.node);

		this.programs.default.setUniforms({
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
				value: viewWorldPosition,
			},
		});

		return uWorld;
	}

	draw(mProjection, viewWorldPosition, pov) {
		this.gl.bindVertexArray(this.programs.default.vao);
		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

		this.updateMatrix(mProjection, viewWorldPosition, pov);
	}
}
