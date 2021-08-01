import { UniformType } from 'engine/utils/shader-program/types';
import { IShaderParam } from 'engine/utils/shader/types';

export default class Shader {
	id: string;
	displayName: string;
	params: IShaderParam[];
	vertex: string;
	fragment: string;

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
		const shader = new Shader();
		shader.id = 'default';
		shader.displayName = 'Default';

		shader.params = [
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
		shader.vertex = `vec4 vertex(vec4 position) {
			return position;
		}`;
		shader.fragment = `vec4 fragment(vec4 color) {
			return color;
		}`;

		return shader;
	}

	static defaultAttribLocations() {
		return {
			aPosition: 0,
			aNormal: 1,
			aTextureCoord: 2,
		};
	}
}
