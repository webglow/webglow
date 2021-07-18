import styled, { css } from 'styled-components';
import { SmallText } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';
import theme from '../../../styles/theme';
import { IWrapperProps } from './types';

export const Wrapper = styled.div<IWrapperProps>`
	position: fixed;
	background: var(--dark-grey);
	border: 1px solid var(--black);
	box-shadow: ${theme.boxShadows.strong};
	padding: ${pxToRem(10)}rem;
	min-width: ${pxToRem(150)}rem;
	border-radius: 3px;

	${({ position }) =>
		position &&
		css`
			top: ${position[1]}px;
			left: ${position[0]}px;
		`}
`;

export const MenuItem = styled(SmallText)`
	cursor: pointer;
	padding: ${pxToRem(3)}rem ${pxToRem(5)}rem;
	background: var(--dark-grey);
	font-size: ${pxToRem(15)}rem;
	transition: background 0.2s ease-in-out;

	&:hover {
		background: var(--black);
	}

	& > svg + div {
		margin-left: ${pxToRem(10)}rem;
	}
`;
