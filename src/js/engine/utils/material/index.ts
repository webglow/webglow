import EngineGlobals from 'engine/globals';
import GameObject from 'engine/utils/game-object';
import ShaderProgram from 'engine/utils/shader-program';
import { UniformType } from 'engine/utils/shader-program/types';
import { IShader } from 'engine/utils/shader/types';
import getDefaultShader from '../shader';
import ShaderController from '../shader-controller';
import { IMaterialParam } from './types';

export default class Material {
	uniforms: { [key: string]: WebGLUniformLocation };
	program: WebGLProgram;
	texture: WebGLTexture;
	shaderProgram: ShaderProgram;
	shaderController: ShaderController;
	shader: IShader;
	gameObject: GameObject;
	params: IMaterialParam[];

	constructor(
		shader: IShader = getDefaultShader(),
		params: IMaterialParam[] = shader.params.map((param) => ({
			displayName: param.displayName,
			key: param.key,
			type: param.type,
			value: param.defaultValue,
		}))
	) {
		this.shader = shader;

		this.params = params;
	}

	toJSON() {
		return {
			shader: this.shader,
			params: this.params,
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

		this.shaderController = new ShaderController(this.shaderProgram);

		this.setUniforms(this.params);
	}

	setUniforms(params: IMaterialParam[]) {
		params.forEach((param) => {
			this.shaderProgram.setUniform(param.type, param.key, param.value);
		});
	}

	setParamValue(key: string, newValue: any) {
		const param = this.params.find((p) => p.key === key);

		if (!param) {
			return;
		}

		param.value = newValue;
		this.shaderProgram.setUniform(param.type, param.key, newValue);
	}

	setTexture(textureUnit: number) {
		this.shaderProgram.setUniform(UniformType.t_int, 'uTexture', textureUnit);
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
