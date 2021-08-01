import React from 'react';
import { Fade } from '@material-ui/core';
import { IProps } from './types';
import {
	StyledModal,
	Body,
	StyledBackdrop,
	Title,
	Content,
	Footer,
} from './styles';

export default function Modal({
	className,
	children,
	minWidth,
	minHeight,
	title,
	footer,
	...modalProps
}: IProps) {
	return (
		<StyledModal
			className={className}
			closeAfterTransition
			BackdropComponent={StyledBackdrop}
			BackdropProps={{
				timeout: 500,
			}}
			{...modalProps}
		>
			<Fade in={modalProps.open}>
				<Body minHeight={minHeight} minWidth={minWidth}>
					{title && <Title>{title}</Title>}
					<Content>{children}</Content>
					<Footer>{footer}</Footer>
				</Body>
			</Fade>
		</StyledModal>
	);
}
