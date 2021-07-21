import React from 'react';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import { Info, Wrapper } from './styles';
import TransformParameter from '../transform-parameter';
import ComponentTitle from '../component-title';

export default function TransformComponent({
	className,
	transformInfo,
	onChange,
}: IProps) {
	if (!transformInfo) {
		return null;
	}

	return (
		<Wrapper className={className}>
			<ComponentTitle icon={faArrowsAlt} title="Transform" />

			<Info>
				<TransformParameter
					name={'position'}
					onChange={(param) => onChange('position', param)}
					value={transformInfo.position as [number, number, number]}
				/>
				<TransformParameter
					name={'rotation'}
					onChange={(param) => onChange('rotation', param)}
					value={transformInfo.rotation as [number, number, number]}
				/>
				<TransformParameter
					name={'scale'}
					onChange={(param) => onChange('scale', param)}
					value={transformInfo.scale as [number, number, number]}
				/>
			</Info>
		</Wrapper>
	);
}
