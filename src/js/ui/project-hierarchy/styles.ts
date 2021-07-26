import styled from 'styled-components';
import { Header } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';

export const Wrapper = styled.div``;

export const Title = styled(Header)`
	padding: ${pxToRem(10)}rem;
	border-bottom: 1px solid var(--black);
`;

export const Contents = styled.div`
	display: grid;
	padding: ${pxToRem(10)}rem;
	grid-gap: ${pxToRem(5)}rem;
	grid-template-columns: repeat(auto-fill, ${pxToRem(90)}rem);
`;
