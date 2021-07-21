import React from 'react';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import { Wrapper } from './styles';
import ComponentTitle from '../component-title';

export default function CameraComponent({ className }: IProps) {
	return (
		<Wrapper className={className}>
			<ComponentTitle icon={faCamera} title="Camera" />
		</Wrapper>
	);
}
