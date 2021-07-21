import styled from 'styled-components';
import { pxToRem } from '../../../../styles/helpers';

export const Wrapper = styled.div``;

export const Name = styled.div`
	background: var(--black);
	margin-top: ${pxToRem(10)}rem;
	padding: ${pxToRem(2)}rem ${pxToRem(4)}rem;
	border-radius: 3px;
`;
