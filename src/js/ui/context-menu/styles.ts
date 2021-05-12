import styled, { css } from 'styled-components';
import { SmallText } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';
import { WrapperProps } from './types';

export const Wrapper = styled.div<WrapperProps>`
	position: fixed;
	background: var(--dark-grey);
	border: 1px solid var(--black);
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
	transition: background 0.2s ease-in-out;

	&:hover {
		background: var(--black);
	}
`;
