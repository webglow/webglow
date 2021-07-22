import React from 'react';
import { Backdrop, Fade } from '@material-ui/core';
import { IProps } from './types';
import { StyledModal } from './styles';

export default function Modal({ className, children, ...modalProps }: IProps) {
	return (
		<StyledModal
			className={className}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}
			{...modalProps}
		>
			<Fade in={modalProps.open}>{children}</Fade>
		</StyledModal>
	);
}
