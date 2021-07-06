import styled from 'styled-components';
import { pxToRem } from '../../../styles/helpers';
import Editor from '../editor';
import Header from '../header';

export const Wrapper = styled.div`
	height: 100%;
	background: var(--dark-grey);
	display: flex;
	flex-flow: column;
`;

export const StyledHeader = styled(Header)`
	height: ${pxToRem(50)}rem;
	flex-shrink: 0;
`;

export const StyledEditor = styled(Editor)`
	height: calc(100% - ${pxToRem(50)}rem);
`;
