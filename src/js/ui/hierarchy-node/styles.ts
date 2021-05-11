import React from 'react';
import styled from 'styled-components';
import HierarchyNodeUI from '.';
import { TextWithIcon } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';
import { TitleProps } from './types';

export const Wrapper = styled.div`
	margin-top: ${pxToRem(5)}rem;
`;

export const Title = styled((props) =>
	React.createElement(TextWithIcon, { ...props, svgWidth: 11 })
)<TitleProps>`
	& > div {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}

	cursor: pointer;
	padding: ${pxToRem(3)}rem ${pxToRem(4)}rem;
	border-radius: 3px;
	transition: background 0.2s ease-in-out;

	&:hover {
		background: var(--black);
	}

	${(props: TitleProps) => props.selected && 'background: var(--black)'};
`;

export const StyledHierarchyNode = styled(HierarchyNodeUI)`
	margin-left: ${pxToRem(10)}rem;
`;
