import styled from 'styled-components';
import { pxToRem } from './helpers';

export const Header = styled.div`
	font-size: ${pxToRem(17)}rem;
`;

export const Input = styled.input`
	display: block;
	background: var(--black);
	color: var(--white);
	min-width: 0;
	border: 0;
	padding: ${pxToRem(2)}rem;
	border-radius: 3px;
`;
