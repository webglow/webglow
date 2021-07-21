import styled from 'styled-components';
import { Button, TextWithIcon } from '../../../../styles/common';
import { pxToRem } from '../../../../styles/helpers';
import theme from '../../../../styles/theme';

export const Wrapper = styled.div`
	position: relative;
`;

export const AddComponentButton = styled(Button)`
	background-color: var(--blue);
	color: var(--black);
	width: 100%;

	&:hover {
		background-color: #139de7;
	}
`;

export const SelectComponentDropdown = styled.div`
	position: absolute;
	background: var(--dark-grey);
	box-shadow: ${theme.boxShadows.strong};
	border: 1px solid var(--black);
	left: 0;
	right: 0;
	padding: ${pxToRem(10)}rem;
`;

export const DropdownOption = styled(TextWithIcon)`
	font-size: ${pxToRem(15)}rem;
	padding: ${pxToRem(3)}rem ${pxToRem(5)}rem;
	background: var(--dark-grey);
	cursor: pointer;
	transition: background 0.2s ease-in-out;
	border-radius: 3px;

	&:hover {
		background: var(--black);
	}

	& > svg + div {
		margin-left: ${pxToRem(10)}rem;
	}
`;
