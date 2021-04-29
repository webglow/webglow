import Material from '..';
import vertexSource from './shaders/vertex.glsl';
import fragmentSource from './shaders/fragment.glsl';
import Color from '../../color';

export default class DefaultMaterial extends Material {
	constructor(
		gl,
		attribLocations,
		{
			enableSpecular = false,
			specularStrength = 0,
			enableLighting = true,
			shadeColor = new Color('#000000').toNormalizedVec3(),
		}
	) {
		super(gl, vertexSource, fragmentSource, attribLocations);

		this.setUniforms({
			uEnableSpecular: {
				type: 'uniform1f',
				value: [enableSpecular],
			},
			uSpecularStrength: {
				type: 'uniform1f',
				value: [specularStrength],
			},
			uEnableLighting: {
				type: 'uniform1f',
				value: [enableLighting],
			},
			uShadeColor: {
				type: 'uniform3f',
				value: shadeColor,
			},
		});
	}

	setTexture(textureUnit) {
		this.setUniforms({
			uTexture: {
				type: 'uniform1i',
				value: [textureUnit],
			},
		});
	}

	setDirectionalLights(lightSources) {
		if (!lightSources || !lightSources.length) {
			return;
		}

		this.materials.default.setUniforms({
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

	setPointLights(lightSources) {
		if (!lightSources || !lightSources.length) {
			return;
		}

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

	setWorldViewProjection(mWorldViewProjection) {
		this.setUniforms({
			uWorldViewProjection: {
				type: 'uniformMatrix4fv',
				value: [false, mWorldViewProjection],
			},
		});
	}

	setWorld(mWorld) {
		this.setUniforms({
			uWorld: {
				type: 'uniformMatrix4fv',
				value: [false, mWorld],
			},
		});
	}

	setWorldInverseTranspose(mWorldInverseTranspose) {
		this.setUniforms({
			uWorldInverseTranspose: {
				type: 'uniformMatrix4fv',
				value: [false, mWorldInverseTranspose],
			},
		});
	}

	setViewWorldPosition(vViewWorldPosition) {
		this.setUniforms({
			uViewWorldPosition: {
				type: 'uniform3f',
				value: vViewWorldPosition,
			},
		});
	}
}
