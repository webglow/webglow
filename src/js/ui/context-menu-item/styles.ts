import styled from 'styled-components';
import { TextWithIcon } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';

export const Wrapper = styled(TextWithIcon)`
	position: relative;
	cursor: pointer;
	padding: ${pxToRem(5)}rem;
	background: var(--dark-grey);
	font-size: ${pxToRem(15)}rem;
	transition: background 0.2s ease-in-out;
	border-radius: 3px;

	&:hover {
		background: var(--black);
	}
`;

export const IconWrapper = styled.div`
	padding: ${pxToRem(5)}rem;
	background: var(--light-grey);
	border-radius: 50%;
	width: ${pxToRem(25)}rem;
	color: var(--blue);
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const Text = styled.div`
	margin-left: ${pxToRem(10)}rem;
`;

export const Expand = styled.div`
	display: flex;
	align-items: center;
	margin-left: auto;
`;
