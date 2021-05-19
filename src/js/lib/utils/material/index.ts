import { mat4, vec3 } from 'gl-matrix';
import Color from '../color';
import { LightType } from '../../3d/standard/light/types';
import Light from '../../3d/standard/light';
import GameObject from '../game-object';
import ShaderProgram from '../shader-program';
import { UniformType } from '../shader-program/types';
import { Shader, ShaderParam } from '../shader/types';

export default class Material {
	gl: WebGL2RenderingContext;
	uniforms: { [key: string]: WebGLUniformLocation };
	program: WebGLProgram;
	texture: WebGLTexture;
	shaderProgram: ShaderProgram;
	shader: Shader;
	gameObject: GameObject;
	params: any;

	constructor(shader: Shader) {
		this.shader = shader;
		this.params = shader.params;
	}

	assign(
		gl: WebGL2RenderingContext,
		gameObject: GameObject,
		attribLocations: { [key: string]: number }
	) {
		this.gl = gl;
		this.gameObject = gameObject;
		this.shaderProgram = new ShaderProgram(
			gl,
			'default',
			this.shader.vertex,
			this.shader.fragment,
			attribLocations
		);

		this.setupColor(new Color('#ffcc00').toVec4());

		this.setUniforms(this.params);
	}

	setUniforms(params: ShaderParam[]) {
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

		this.setTexture(0);
	}

	bindTexture() {
		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
	}
}
