import React, { useState } from 'react';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import {
	ParamName,
	ParamValueInput,
	ParamValueSelect,
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
	const [intensityParam, setIntensityParam] = useState<string>(
		intensity.toString()
	);

	const handleSubmitIntensity = (event: React.KeyboardEvent) => {
		if (event.code === 'Enter') {
			onChange('intensity', parseFloat(intensityParam));
		}
	};

	return (
		<Wrapper className={className}>
			<ComponentTitle icon={faLightbulb} title="Light" />

			<Settings>
				<ParamName>Intensity:</ParamName>
				<ParamValueInput
					type="number"
					value={intensityParam}
					onKeyPress={handleSubmitIntensity}
					onChange={(event) => {
						setIntensityParam(event.target.value);
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
