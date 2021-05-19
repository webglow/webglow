import React from 'react';
import styled from 'styled-components';
import HierarchyNodeUI from '.';
import { TextWithIcon } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';
import { ITitleProps } from './types';

export const Wrapper = styled.div``;

export const Title = styled((props) =>
	React.createElement(TextWithIcon, { ...props, svgWidth: 11 })
)<ITitleProps>`
	& > div {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	cursor: pointer;
	padding: ${pxToRem(5)}rem ${pxToRem(4)}rem;
	border-radius: 3px;
	transition: background 0.2s ease-in-out;
	user-select: none;

	&:hover {
		background: var(--dark-dark-grey);
	}

	${(props: ITitleProps) =>
		props.selected && 'background: var(--dark-dark-grey)'};
`;

export const StyledHierarchyNode = styled(HierarchyNodeUI)`
	margin-left: ${pxToRem(10)}rem;
`;
