import React from 'react';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import { ParamControl, ParamName, ParamsList, Wrapper } from './styles';
import ComponentTitle from '../component-title';
import { IMaterialParam } from '../../../engine/utils/material/types';
import { ControlType } from '../../../engine/utils/shader/types';
import Checkbox from '../../checkbox';

export default function MaterialComponent({ className, material }: IProps) {
	const getControl = (param: IMaterialParam) => {
		switch (param.controlType) {
			case ControlType.Checkbox:
				return <Checkbox checked={param.value} />;
			case ControlType.NumberInput:
				return <ParamControl type="number" value={param.value} />;
			case ControlType.ColorInput:
				return <ParamControl type="color" value={param.value} />;
			default:
				console.error(`Unrecognized control type ${param.controlType}`);
		}
	};

	return (
		<Wrapper className={className}>
			<ComponentTitle icon={faPalette} title="Material" />

			<ParamsList>
				{material.params.map((param) => (
					<>
						<ParamName>{param.displayName}:</ParamName>
						{getControl(param)}
					</>
				))}
			</ParamsList>
		</Wrapper>
	);
}
