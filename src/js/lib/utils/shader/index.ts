import Color from '../color';
import { UniformType } from '../shader-program/types';
import { IShader } from './types';

const defaultShader: IShader = {
	params: [
		{
			displayName: 'Enable Specular',
			key: 'uEnableSpecular',
			value: 0,
			type: UniformType.t_float,
		},
		{
			displayName: 'Specular Strength',
			key: 'uSpecularStrength',
			value: 0,
			type: UniformType.t_float,
		},
		{
			displayName: 'Enable Light',
			key: 'uEnableLighting',
			value: 1,
			type: UniformType.t_float,
		},
		{
			displayName: 'Shade Color',
			key: 'uShadeColor',
			value: new Color('#000000').toNormalizedVec3(),
			type: UniformType.t_vec3,
		},
	],
	vertex: `vec4 vertex(vec4 position) {
		return position;
	}`,
	fragment: `vec4 fragment(vec4 color) {
		return color;
	}`,
};

export default defaultShader;
