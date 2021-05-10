import React, { useState } from 'react';
import { vec3 } from 'gl-matrix';
import { Props } from './types';
import { Info, Title, Wrapper } from './styles';
import { TransformInfo } from '../../lib/3d/standard/transform/types';
import TransformParameter from '../transform-parameter';

export default function Transform({
	className,
	transformInfo,
	onChange,
}: Props) {
	if (!transformInfo) {
		return null;
	}

	const onParamChange = (
		name: keyof TransformInfo,
		newValue: [number, number, number]
	) => {
		const newInfo: TransformInfo = {
			position: [...transformInfo.position] as vec3,
			rotation: [...transformInfo.rotation] as vec3,
			scale: [...transformInfo.scale] as vec3,
		};

		newInfo[name] = [...newValue];

		onChange(newInfo);
	};

	return (
		<Wrapper className={className}>
			<Title>Transform</Title>

			<Info>
				<TransformParameter
					name={'position'}
					onChange={(param) => onParamChange('position', param)}
					value={transformInfo.position as [number, number, number]}
				/>
				<TransformParameter
					name={'rotation'}
					onChange={(param) => onParamChange('rotation', param)}
					value={transformInfo.rotation as [number, number, number]}
				/>
				<TransformParameter
					name={'scale'}
					onChange={(param) => onParamChange('scale', param)}
					value={transformInfo.scale as [number, number, number]}
				/>
			</Info>
		</Wrapper>
	);
}
