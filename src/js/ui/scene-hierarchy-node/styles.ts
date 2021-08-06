import styled, { css } from 'styled-components';
import { Button, TextWithIcon } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';
import { ICollapseButtonProps, ITitleProps } from './types';

export const Node = styled.div`
	user-select: none;
	display: flex;
`;

export const Wrapper = styled.div`
	& > & {
		margin-left: ${pxToRem(10)}rem;
		margin-top: ${pxToRem(5)}rem;
	}
`;

export const CollapseButton = styled(Button)<ICollapseButtonProps>`
	background: var(--grey);
	color: var(--white);
	padding: ${pxToRem(5)}rem ${pxToRem(5)}rem;

	& > svg {
		transition: transform 0.2s ease-in-out;
	}

	${(props) =>
		!props.collapsed &&
		css`
			& > svg {
				transform: rotate(90deg);
			}
		`}
`;

export const SelectableArea = styled(TextWithIcon)<ITitleProps>`
	min-width: 0;
	cursor: pointer;
	padding: ${pxToRem(5)}rem;
	font-size: ${pxToRem(15)}rem;
	flex-grow: 1;
	border-radius: 3px;
	transition: background 0.2s ease-in-out;

	&:hover {
		background: var(--dark-dark-grey);
	}

	${(props: ITitleProps) =>
		props.selected && 'background: var(--dark-dark-grey)'};
`;

export const IconWrapper = styled.div`
	padding: ${pxToRem(5)}rem;
	background: var(--light-grey);
	border-radius: 50%;
	width: ${pxToRem(24)}rem;
	color: var(--white);
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Text = styled.div`
	margin-left: ${pxToRem(10)}rem;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
`;
