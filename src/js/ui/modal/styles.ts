import { Backdrop, Modal } from '@material-ui/core';
import styled from 'styled-components';
import { Header } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';
import theme from '../../../styles/theme';
import { IModalBodyProps } from './types';

export const StyledModal = styled(Modal)``;

export const StyledBackdrop = styled(Backdrop)`
	background-color: rgba(0, 0, 0, 0.2);
`;

export const Title = styled(Header)`
	padding: ${pxToRem(10)}rem;
	border-bottom: 1px solid var(--black);
`;

export const Body = styled.div<IModalBodyProps>`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 3px;
	background-color: var(--dark-grey);
	display: flex;
	flex-flow: column;
	color: var(--white);
	min-width: ${({ minWidth = 300 }) => pxToRem(minWidth)}rem;
	min-height: ${({ minHeight = 200 }) => pxToRem(minHeight)}rem;
	box-shadow: ${theme.boxShadows.strong};
`;

export const Content = styled.div`
	padding: ${pxToRem(10)}rem;
`;

export const Footer = styled.div`
	margin-top: auto;
	border-top: 1px solid var(--black);
	padding: ${pxToRem(10)}rem;
`;
