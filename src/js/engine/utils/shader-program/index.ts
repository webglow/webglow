import { createProgram, createShader } from 'engine/utils/helpers';
import EngineGlobals from 'engine/globals';
// @ts-ignore
import vertexSource from './default-shaders/vertex.glsl';
// @ts-ignore
import fragmentSource from './default-shaders/fragment.glsl';

import { UniformType } from './types';
import Color from '../color';

export default class ShaderProgram {
	name: string;
	program: WebGLProgram;
	uniformLocations: { [key: string]: WebGLUniformLocation };

	constructor(
		name: string,
		vertexSrc: string,
		fragmentSrc: string,
		attribLocations: { [key: string]: number }
	) {
		this.name = name;

		this.uniformLocations = {};

		this.program = this.createProgram(
			this.processSource(vertexSource, vertexSrc),
			this.processSource(fragmentSource, fragmentSrc),
			attribLocations
		);
	}

	processSource(source: string, shaderExtension: string) {
		return source.replace(/#{shaderExtension}/, shaderExtension);
	}

	createProgram(
		vertexSrc: string,
		fragmentSrc: string,
		attribLocations: { [key: string]: number }
	) {
		const vertexShader = createShader(
			EngineGlobals.gl,
			EngineGlobals.gl.VERTEX_SHADER,
			vertexSrc
		);
		const fragmentShader = createShader(
			EngineGlobals.gl,
			EngineGlobals.gl.FRAGMENT_SHADER,
			fragmentSrc
		);

		return createProgram(
			EngineGlobals.gl,
			vertexShader,
			fragmentShader,
			attribLocations
		);
	}

	setUniform(type: UniformType, name: string, value: any) {
		EngineGlobals.gl.useProgram(this.program);

		const uniformLocation =
			this.uniformLocations[name] ||
			EngineGlobals.gl.getUniformLocation(this.program, name);

		switch (type) {
			case UniformType.t_int:
				EngineGlobals.gl.uniform1i(uniformLocation, value);
				break;
			case UniformType.t_uint:
				EngineGlobals.gl.uniform1ui(uniformLocation, value);
				break;
			case UniformType.t_bool:
				EngineGlobals.gl.uniform1f(uniformLocation, value);
				break;
			case UniformType.t_float:
				EngineGlobals.gl.uniform1f(uniformLocation, value);
				break;
			case UniformType.t_vec3:
				EngineGlobals.gl.uniform3f(
					uniformLocation,
					...(value as [number, number, number])
				);
				break;
			case UniformType.t_color:
				EngineGlobals.gl.uniform3f(
					uniformLocation,
					...new Color(value).toNormalizedVec3()
				);
				break;
			case UniformType.t_mat3:
				EngineGlobals.gl.uniformMatrix3fv(
					uniformLocation,
					false,
					value[0],
					value[1],
					value[2]
				);
				break;
			case UniformType.t_mat4:
				EngineGlobals.gl.uniformMatrix4fv(uniformLocation, false, value);
				break;
			default:
				throw new Error(`Unrecognized uniform type ${type}`);
		}
	}
}
