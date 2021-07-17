import { mat4, vec3 } from 'gl-matrix';
import Light from '../../standard/light';
import { LightType } from '../../standard/light/types';
import ShaderProgram from '../shader-program';
import { UniformType } from '../shader-program/types';

export default class ShaderController {
	shaderProgram: ShaderProgram;

	constructor(shaderProgram: ShaderProgram) {
		this.shaderProgram = shaderProgram;
	}

	setWorldViewProjection(mWorldViewProjection: mat4) {
		this.shaderProgram.setUniform(
			UniformType.t_mat4,
			'uWorldViewProjection',
			mWorldViewProjection
		);
	}

	setWorld(mWorld: mat4) {
		this.shaderProgram.setUniform(UniformType.t_mat4, 'uWorld', mWorld);
	}

	setWorldInverseTranspose(mWorldInverseTranspose: mat4) {
		this.shaderProgram.setUniform(
			UniformType.t_mat4,
			'uWorldInverseTranspose',
			mWorldInverseTranspose
		);
	}

	setViewWorldPosition(vViewWorldPosition: vec3) {
		this.shaderProgram.setUniform(
			UniformType.t_vec3,
			'uViewWorldPosition',
			vViewWorldPosition
		);
	}

	setLights(type: LightType, lightSources: Light[]) {
		if (!lightSources || !lightSources.length) {
			return;
		}

		const matKey =
			type === LightType.Point ? 'uPointLight' : 'uDirectionalLight';
		const numKey =
			type === LightType.Point
				? 'uPointLightNumber'
				: 'uDirectionalLightNumber';

		this.shaderProgram.setUniform(UniformType.t_mat3, matKey, [
			new Float32Array(lightSources.map((l) => l.toMat3Array()).flat()),
			0,
			lightSources.length * 3 * 3,
		]);
		this.shaderProgram.setUniform(
			UniformType.t_uint,
			numKey,
			lightSources.length
		);
	}
}
