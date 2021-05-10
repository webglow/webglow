import styled from 'styled-components';
import HierarchyNodeUI from '.';
import { pxToRem } from '../../../styles/helpers';
import { TitleProps } from './types';

export const Wrapper = styled.div`
	margin-top: ${pxToRem(5)}rem;
`;

export const Title = styled.div<TitleProps>`
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	cursor: pointer;
	padding: ${pxToRem(2)}rem ${pxToRem(3)}rem;
	padding-left: ${pxToRem(1)}rem;
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
