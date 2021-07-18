import styled from 'styled-components';
import { Header, SmallText } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';
import theme from '../../../styles/theme';

export const Wrapper = styled.div``;

export const Title = styled(Header)`
	padding: ${pxToRem(10)}rem;
	border-bottom: 1px solid var(--black);
`;

export const Contents = styled.div`
	display: grid;
	padding: ${pxToRem(10)}rem;
	grid-template-columns: repeat(auto-fill, ${pxToRem(90)}rem);
`;

export const FileUI = styled.div`
	display: flex;
	flex-flow: column;
	align-items: center;
	cursor: pointer;
	padding: ${pxToRem(10)}rem;
	border-radius: 3px;
	transition: box-shadow 0.2s ease-in-out;
	justify-content: center;
	user-select: none;

	& > svg.svg-inline--fa {
		width: ${pxToRem(40)}rem;
		height: ${pxToRem(40)}rem;
	}

	&:hover {
		box-shadow: ${theme.boxShadows.insetSoft};
	}

	&:active {
		box-shadow: ${theme.boxShadows.insetStrong};
	}
`;

export const FileName = styled(SmallText)`
	text-align: center;
	margin-top: ${pxToRem(5)}rem;
	word-break: break-all;
`;
