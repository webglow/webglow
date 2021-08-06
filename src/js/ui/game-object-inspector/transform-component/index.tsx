import React from 'react';
import { faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { observer } from 'mobx-react';
import { IProps } from './types';
import { Info, Wrapper } from './styles';
import TransformParameter from '../transform-parameter';
import ComponentTitle from '../component-title';

const TransformComponent = observer(
	({ className, transform, onChange }: IProps) => {
		if (!transform) {
			return null;
		}

		return (
			<Wrapper className={className}>
				<ComponentTitle icon={faArrowsAlt} title="Transform" />

				<Info>
					<TransformParameter
						name={'position'}
						onChange={(param) => onChange('position', param)}
						value={transform.position as [number, number, number]}
					/>
					<TransformParameter
						name={'rotation'}
						onChange={(param) => onChange('eulerRotation', param)}
						value={transform.eulerRotation as [number, number, number]}
					/>
					<TransformParameter
						name={'scale'}
						onChange={(param) => onChange('scale', param)}
						value={transform.scale as [number, number, number]}
					/>
				</Info>
			</Wrapper>
		);
	}
);

export default TransformComponent;
