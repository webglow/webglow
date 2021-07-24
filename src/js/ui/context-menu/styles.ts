import styled, { css } from 'styled-components';
import { pxToRem } from '../../../styles/helpers';
import theme from '../../../styles/theme';
import { IWrapperProps } from './types';

export const Wrapper = styled.div<IWrapperProps>`
	position: fixed;
	background: var(--dark-grey);
	border: 1px solid var(--black);
	box-shadow: ${theme.boxShadows.strong};
	padding: ${pxToRem(10)}rem;
	min-width: ${pxToRem(200)}rem;
	border-radius: 3px;
	z-index: 2;

	${({ position }) =>
		position &&
		css`
			top: ${position[1]}px;
			left: ${position[0]}px;
		`}
`;

export const Separator = styled.div`
	height: 1px;
	background: var(--light-grey);
	margin: ${pxToRem(5)}rem 0;
`;
