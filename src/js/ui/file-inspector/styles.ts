import styled from 'styled-components';
import { SmallText, SubHeader } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';

export const Wrapper = styled.div`
	padding: ${pxToRem(10)}rem;
`;

export const FileName = styled(SubHeader)``;

export const Content = styled(SmallText)`
	white-space: pre-wrap;
	background: var(--dark-dark-grey);
	padding: ${pxToRem(10)}rem;
	margin-top: ${pxToRem(10)}rem;
	overflow-x: auto;
	border-radius: 3px;
`;
