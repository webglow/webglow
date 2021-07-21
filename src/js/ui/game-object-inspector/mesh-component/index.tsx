import React from 'react';
import { faTh } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import { Name, Wrapper } from './styles';
import ComponentTitle from '../component-title';

export default function MeshComponent({ className, meshName }: IProps) {
	return (
		<Wrapper className={className}>
			<ComponentTitle icon={faTh} title="Mesh" />

			<Name>{meshName}</Name>
		</Wrapper>
	);
}
