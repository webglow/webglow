import React from 'react';
import { IProps } from './types';
import { StyledCheckbox } from './styles';

export default function Checkbox({ className, ...checkboxProps }: IProps) {
	return (
		<StyledCheckbox
			className={className}
			disableRipple={true}
			{...checkboxProps}
		/>
	);
}
