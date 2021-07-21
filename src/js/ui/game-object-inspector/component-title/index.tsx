import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IProps } from './types';
import { Title } from './styles';

export default function ComponentTitle({ className, icon, title }: IProps) {
	return (
		<Title className={className}>
			<FontAwesomeIcon icon={icon} />
			<div>{title}</div>
		</Title>
	);
}
