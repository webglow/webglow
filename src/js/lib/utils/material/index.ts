import { mat4, vec3 } from 'gl-matrix';
import Color from '../color';
import { LightType } from '../../3d/standard/light/types';
import Light from '../../3d/standard/light';
import GameObject from '../game-object';
import ShaderProgram from '../shader-program';
import { UniformType } from '../shader-program/types';
import { IShader, IShaderParam } from '../shader/types';
import EngineGlobals from '../../../globals';

export default class Material {
	uniforms: { [key: string]: WebGLUniformLocation };
	program: WebGLProgram;
	texture: WebGLTexture;
	shaderProgram: ShaderProgram;
	shader: IShader;
	gameObject: GameObject;
	params: any;

	constructor(shader: IShader) {
		this.shader = shader;
		this.params = shader.params;
	}

	toJSON() {
		return {
			shader: this.shader,
		};
	}

	attach(gameObject: GameObject, attribLocations: { [key: string]: number }) {
		this.gameObject = gameObject;
		this.shaderProgram = new ShaderProgram(
			'default',
			this.shader.vertex,
			this.shader.fragment,
			attribLocations
		);

		this.setupColor(new Color('#ffcc00').toVec4());

		this.setUniforms(this.params);
	}

	setUniforms(params: IShaderParam[]) {
		params.forEach((param) => {
			this.shaderProgram.setUniform(param.type, param.key, param.value);
		});
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

	setTexture(textureUnit: number) {
		this.shaderProgram.setUniform(UniformType.t_int, 'uTexture', textureUnit);
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

	setupColor(color: number[]) {
		this.texture = EngineGlobals.gl.createTexture();
		EngineGlobals.gl.activeTexture(EngineGlobals.gl.TEXTURE0);
		EngineGlobals.gl.bindTexture(EngineGlobals.gl.TEXTURE_2D, this.texture);

		const level = 0;
		const width = 1;
		const height = 1;
		const border = 0;
		const format = EngineGlobals.gl.RGBA;
		const type = EngineGlobals.gl.UNSIGNED_BYTE;
		const data = new Uint8Array(color);
		EngineGlobals.gl.texImage2D(
			EngineGlobals.gl.TEXTURE_2D,
			level,
			format,
			width,
			height,
			border,
			format,
			type,
			data
		);

		EngineGlobals.gl.texParameteri(
			EngineGlobals.gl.TEXTURE_2D,
			EngineGlobals.gl.TEXTURE_MIN_FILTER,
			EngineGlobals.gl.NEAREST
		);
		EngineGlobals.gl.texParameteri(
			EngineGlobals.gl.TEXTURE_2D,
			EngineGlobals.gl.TEXTURE_MAG_FILTER,
			EngineGlobals.gl.NEAREST
		);
		EngineGlobals.gl.texParameteri(
			EngineGlobals.gl.TEXTURE_2D,
			EngineGlobals.gl.TEXTURE_WRAP_S,
			EngineGlobals.gl.CLAMP_TO_EDGE
		);
		EngineGlobals.gl.texParameteri(
			EngineGlobals.gl.TEXTURE_2D,
			EngineGlobals.gl.TEXTURE_WRAP_T,
			EngineGlobals.gl.CLAMP_TO_EDGE
		);

		this.setTexture(0);
	}

	bindTexture() {
		EngineGlobals.gl.activeTexture(EngineGlobals.gl.TEXTURE0);
		EngineGlobals.gl.bindTexture(EngineGlobals.gl.TEXTURE_2D, this.texture);
	}
}
