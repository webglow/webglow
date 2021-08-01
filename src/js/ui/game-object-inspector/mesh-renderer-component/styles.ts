import styled from 'styled-components';
import { SmallText } from '../../../../styles/common';
import { pxToRem } from '../../../../styles/helpers';

export const Wrapper = styled.div``;

export const MaterialInfo = styled.div`
	margin-top: ${pxToRem(10)}rem;

	display: grid;
	grid-template-columns: 10fr 14fr;
	grid-gap: ${pxToRem(5)}rem;
`;

export const MaterialInfoKey = styled(SmallText)``;

export const MaterialName = styled.div`
	background: var(--black);
	padding: ${pxToRem(2)}rem ${pxToRem(4)}rem;
	border-radius: 3px;
	cursor: pointer;
	transition: background 0.2s ease-in-out;

	&:hover {
		background: var(--light-grey);
	}
`;
