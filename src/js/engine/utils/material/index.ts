import EngineGlobals from 'engine/globals';
import { v4 as uuidv4 } from 'uuid';
import { UniformType } from 'engine/utils/shader/types';
import Shader from 'engine/utils/shader';
import { IMaterialJSON, IMaterialParam } from './types';

export default class Material {
	id: string;
	displayName: string;
	uniforms: { [key: string]: WebGLUniformLocation };
	program: WebGLProgram;
	texture: WebGLTexture;
	shader: Shader;
	params: IMaterialParam[];

	constructor(
		shader: Shader,
		displayName: string,
		id: string = uuidv4(),
		params: IMaterialParam[] = shader.params.map((param) => ({
			displayName: param.displayName,
			key: param.key,
			type: param.type,
			value: param.defaultValue,
		}))
	) {
		this.id = id;
		this.displayName = displayName;
		this.shader = shader;
		this.params = params;

		this.setUniforms(this.params);
	}

	static default() {
		return new Material(Shader.default(), 'default', 'default');
	}

	static fromJSON({ id, displayName, shaderId, params }: IMaterialJSON) {
		return new Material(Shader.default(), displayName, id, params);
	}

	toJSON(): IMaterialJSON {
		return {
			id: this.id,
			displayName: this.displayName,
			shaderId: this.shader.id,
			params: this.params,
		};
	}

	setUniforms(params: IMaterialParam[]) {
		params.forEach((param) => {
			this.shader.setUniform(param.type, param.key, param.value);
		});
	}

	setParamValue(key: string, newValue: any) {
		const param = this.params.find((p) => p.key === key);

		if (!param) {
			return;
		}

		param.value = newValue;
		this.shader.setUniform(param.type, param.key, newValue);
	}

	setTexture(textureUnit: number) {
		this.shader.setUniform(UniformType.t_int, 'uTexture', textureUnit);
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
