import styled from 'styled-components';
import SceneHierarchyNodeUI from '.';
import { TextWithIcon } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';
import { ITitleProps } from './types';

export const Wrapper = styled.div``;

export const Node = styled(TextWithIcon)<ITitleProps>`
	cursor: pointer;
	padding: ${pxToRem(5)}rem;
	font-size: ${pxToRem(15)}rem;
	border-radius: 3px;
	transition: background 0.2s ease-in-out;
	user-select: none;

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

export const StyledHierarchyNode = styled(SceneHierarchyNodeUI)`
	margin-left: ${pxToRem(10)}rem;
`;
