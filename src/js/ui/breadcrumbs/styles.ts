import styled from 'styled-components';
import { pxToRem } from '../../../styles/helpers';

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	padding: ${pxToRem(10)}rem;
	border-bottom: 1px solid var(--black);
`;

export const BreadcrumbWrapper = styled.div`
	display: flex;
	align-items: center;

	& > svg.svg-inline--fa {
		width: ${pxToRem(10)}rem;
		height: ${pxToRem(10)}rem;

		margin: 0 ${pxToRem(5)}rem;
	}
`;

export const Breadcrumb = styled.div`
	cursor: pointer;
	user-select: none;

	&:hover {
		text-decoration: underline;
		color: var(--blue);
	}
`;
