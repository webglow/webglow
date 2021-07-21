import { UniformType } from 'engine/utils/shader-program/types';
import { ControlType, IShader } from 'engine/utils/shader/types';

const defaultShader: IShader = {
	params: [
		{
			displayName: 'Enable Specular',
			key: 'uEnableSpecular',
			defaultValue: 0,
			type: UniformType.t_float,
			controlType: ControlType.Checkbox,
		},
		{
			displayName: 'Specular Strength',
			key: 'uSpecularStrength',
			defaultValue: 0,
			type: UniformType.t_float,
			controlType: ControlType.NumberInput,
		},
		{
			displayName: 'Enable Light',
			key: 'uEnableLighting',
			defaultValue: 1,
			type: UniformType.t_float,
			controlType: ControlType.Checkbox,
		},
		{
			displayName: 'Shade Color',
			key: 'uShadeColor',
			defaultValue: '#000000',
			type: UniformType.t_color,
			controlType: ControlType.ColorInput,
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
