import React from 'react';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import {
	ParamName,
	ParamValueInput,
	ParamValueSelect,
	ParamValueTextInput,
	Settings,
	Wrapper,
} from './styles';
import { LightType } from '../../../engine/standard/light/types';
import ComponentTitle from '../component-title';

export default function LightComponent({
	className,
	light: { intensity, type, color },
	onChange,
}: IProps) {
	return (
		<Wrapper className={className}>
			<ComponentTitle icon={faLightbulb} title="Light" />

			<Settings>
				<ParamName>Intensity:</ParamName>
				<ParamValueTextInput
					type="number"
					value={intensity}
					onChange={(newValue) => {
						onChange('intensity', newValue ? parseFloat(newValue) : 0);
					}}
				/>

				<ParamName>Type:</ParamName>
				<ParamValueSelect
					value={type}
					onChange={(event) =>
						onChange('type', parseInt(event.target.value) as LightType)
					}
				>
					<option value={LightType.Directional}>Directional</option>
					<option value={LightType.Point}>Point</option>
				</ParamValueSelect>

				<ParamName>Color:</ParamName>
				<ParamValueInput
					type="color"
					value={color.hex}
					onChange={(event) => onChange('color', event.target.value)}
				/>
			</Settings>
		</Wrapper>
	);
}
