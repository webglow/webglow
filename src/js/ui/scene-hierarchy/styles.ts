import styled from 'styled-components';
import { Header } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';

export const Wrapper = styled.div``;

export const Title = styled(Header)`
	border-bottom: 1px solid var(--black);
	padding: ${pxToRem(10)}rem;
`;

export const NodeList = styled.div`
	padding: ${pxToRem(10)}rem;
`;
