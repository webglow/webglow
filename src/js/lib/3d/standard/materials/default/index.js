import vertexSource from './shaders/vertex.glsl';
import fragmentSource from './shaders/fragment.glsl';
import Color from '../../../../utils/color';
import Material3D from '..';

export default class DefaultMaterial3D extends Material3D {
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
}
