import { UniformType } from 'engine/utils/shader-program/types';
import { IShader } from 'engine/utils/shader/types';

const getDefaultShader = (): IShader => ({
	params: [
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
	],
	vertex: `vec4 vertex(vec4 position) {
		return position;
	}`,
	fragment: `vec4 fragment(vec4 color) {
		return color;
	}`,
});

export default getDefaultShader;
