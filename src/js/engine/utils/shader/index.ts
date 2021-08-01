import { IShaderParam, UniformType } from 'engine/utils/shader/types';
import { v4 as uuidv4 } from 'uuid';
import EngineGlobals from '../../globals';
import Color from '../color';
// @ts-ignore
import vertexSource from './default-shaders/vertex.glsl';
// @ts-ignore
import fragmentSource from './default-shaders/fragment.glsl';
import { createShader, createProgram } from '../helpers';

export default class Shader {
	id: string;
	displayName: string;
	params: IShaderParam[];
	vertex: string;
	fragment: string;
	program: WebGLProgram;
	uniformLocations: { [key: string]: WebGLUniformLocation };

	constructor(
		displayName: string,
		vertexSrc: string,
		fragmentSrc: string,
		params: IShaderParam[],
		attribLocations: { [key: string]: number },
		id: string = uuidv4()
	) {
		this.id = id;
		this.displayName = displayName;
		this.params = params;
		this.vertex = vertexSrc;
		this.fragment = fragmentSrc;

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

	toJSON() {
		return {
			id: this.id,
			displayName: this.displayName,
			params: this.params,
			vertex: this.vertex,
			fragment: this.fragment,
		};
	}

	static default() {
		const vertex = `vec4 vertex(vec4 position) {
			return position;
		}`;
		const fragment = `vec4 fragment(vec4 color) {
			return color;
		}`;
		const params = [
			{
				displayName: 'Enable Specular',
				key: 'uEnableSpecular',
				defaultValue: false,
				type: UniformType.t_bool,
			},
			{
				displayName: 'Specular Strength',
				key: 'uSpecularStrength',
				defaultValue: 0,
				type: UniformType.t_float,
			},
			{
				displayName: 'Enable Light',
				key: 'uEnableLighting',
				defaultValue: true,
				type: UniformType.t_bool,
			},
			{
				displayName: 'Color',
				key: 'uColor',
				defaultValue: '#ffffff',
				type: UniformType.t_color,
			},
		];

		const shader = new Shader(
			'default',
			vertex,
			fragment,
			params,
			Shader.defaultAttribLocations(),
			'default'
		);

		return shader;
	}

	static defaultAttribLocations() {
		return {
			aPosition: 0,
			aNormal: 1,
			aTextureCoord: 2,
		};
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
