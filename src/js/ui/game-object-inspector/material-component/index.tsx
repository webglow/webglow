import React, { Fragment } from 'react';
import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import {
	ParamControl,
	ParamName,
	ParamsList,
	TextParamControl,
	Wrapper,
} from './styles';
import ComponentTitle from '../component-title';
import { IMaterialParam } from '../../../engine/utils/material/types';
import Checkbox from '../../checkbox';
import { UniformType } from '../../../engine/utils/shader-program/types';

export default function MaterialComponent({
	className,
	material,
	onParamChange,
}: IProps) {
	const getControl = (param: IMaterialParam) => {
		switch (param.type) {
			case UniformType.t_bool:
				return (
					<Checkbox
						checked={param.value}
						onChange={(event) => onParamChange(param.key, event.target.checked)}
					/>
				);
			case UniformType.t_color:
				return (
					<ParamControl
						type="color"
						value={param.value}
						onChange={(event) => onParamChange(param.key, event.target.value)}
					/>
				);
			default:
				return (
					<TextParamControl
						type="number"
						value={param.value}
						onChange={(newValue) => onParamChange(param.key, newValue)}
					/>
				);
		}
	};

	return (
		<Wrapper className={className}>
			<ComponentTitle icon={faPalette} title="Material" />

			<ParamsList>
				{material.params.map((param) => (
					<Fragment key={param.key}>
						<ParamName>{param.displayName}:</ParamName>
						{getControl(param)}
					</Fragment>
				))}
			</ParamsList>
		</Wrapper>
	);
}
