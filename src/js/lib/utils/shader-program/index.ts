// @ts-ignore
import vertexSource from './default-shaders/vertex.glsl';
// @ts-ignore
import fragmentSource from './default-shaders/fragment.glsl';

import { createShader, createProgram } from '../helpers';
import { UniformType } from './types';

export default class ShaderProgram {
	gl: WebGL2RenderingContext;
	name: string;
	program: WebGLProgram;
	uniformLocations: { [key: string]: WebGLUniformLocation };

	constructor(
		gl: WebGL2RenderingContext,
		name: string,
		vertexSrc: string,
		fragmentSrc: string,
		attribLocations: { [key: string]: number }
	) {
		this.gl = gl;

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
			this.gl,
			this.gl.VERTEX_SHADER,
			vertexSrc
		);
		const fragmentShader = createShader(
			this.gl,
			this.gl.FRAGMENT_SHADER,
			fragmentSrc
		);

		return createProgram(
			this.gl,
			vertexShader,
			fragmentShader,
			attribLocations
		);
	}

	setUniform(type: UniformType, name: string, value: any) {
		this.gl.useProgram(this.program);

		const uniformLocation =
			this.uniformLocations[name] ||
			this.gl.getUniformLocation(this.program, name);

		switch (type) {
			case UniformType.t_int:
				this.gl.uniform1i(uniformLocation, value);
				return;
			case UniformType.t_uint:
				this.gl.uniform1ui(uniformLocation, value);
				return;
			case UniformType.t_float:
				this.gl.uniform1f(uniformLocation, value);
				return;
			case UniformType.t_vec3:
				this.gl.uniform3f(
					uniformLocation,
					...(value as [number, number, number])
				);
				return;
			case UniformType.t_mat3:
				this.gl.uniformMatrix3fv(
					uniformLocation,
					false,
					value[0],
					value[1],
					value[2]
				);
				return;
			case UniformType.t_mat4:
				this.gl.uniformMatrix4fv(uniformLocation, false, value);
				return;
			default:
				throw new Error(`Unrecognized uniform type ${type}`);
		}
	}
}
