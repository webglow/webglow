import styled, { css } from 'styled-components';
import { Button } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';
import { IMaterialItemProps } from './types';

export const Wrapper = styled.div``;

export const Footer = styled.div`
	display: flex;
`;

export const ButtonsContainer = styled.div`
	margin-left: auto;
	display: flex;
`;

export const CancelButton = styled(Button)`
	background-color: var(--orange);
`;

export const AssignButton = styled(Button)`
	background-color: var(--green);
	margin-left: ${pxToRem(5)}rem;
`;

export const MaterialList = styled.div`
	display: grid;
	grid-gap: ${pxToRem(5)}rem;
	grid-template-columns: repeat(auto-fill, ${pxToRem(90)}rem);
`;

export const MaterialName = styled.div`
	display: block;
	max-width: 100%;
	min-width: 0;
	text-align: center;
	margin-top: ${pxToRem(10)}rem;
	font-size: ${pxToRem(13)}rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	padding: 0 ${pxToRem(3)}rem;
`;

export const MaterialItem = styled.div<IMaterialItemProps>`
	display: flex;
	flex-flow: column;
	align-items: center;
	cursor: pointer;
	border-radius: 3px;
	transition: box-shadow 0.2s ease-in-out;
	justify-content: center;
	user-select: none;
	${(props) =>
		props.selected &&
		css`
			& > svg {
				color: var(--blue);
			}

			& ${MaterialName} {
				background: var(--blue);
				color: var(--black);
				border-radius: 3px;
			}
		`}

	& > svg.svg-inline--fa {
		width: ${pxToRem(40)}rem;
		height: ${pxToRem(40)}rem;
	}
`;
