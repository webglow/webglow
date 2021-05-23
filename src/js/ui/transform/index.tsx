import React from 'react';
import { vec3 } from 'gl-matrix';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import { Info, Title, Wrapper } from './styles';
import TransformParameter from '../transform-parameter';

export default function Transform({
	className,
	transformInfo,
	onChange,
}: IProps) {
	if (!transformInfo) {
		return null;
	}

	return (
		<Wrapper className={className}>
			<Title>
				<FontAwesomeIcon icon={faArrowsAlt} />
				<div>Transform</div>
			</Title>

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
