import styled, { css } from 'styled-components';
import { pxToRem } from '../../../styles/helpers';
import TextInput from '../text-input';
import { IWrapperProps } from './types';

export const FileName = styled.div`
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

export const FileNameInput = styled(TextInput)`
	max-width: 100%;
	height: ${pxToRem(15)}rem;
	font-size: ${pxToRem(13)}rem;
	margin-top: ${pxToRem(10)}rem;
`;

export const Wrapper = styled.div<IWrapperProps>`
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

			& ${FileName} {
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
