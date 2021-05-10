import styled from 'styled-components';
import { Header } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';

export const Wrapper = styled.div`
	padding: ${pxToRem(10)}rem;

	& > * + * {
		margin-top: ${pxToRem(10)}rem;
	}
`;

export const Title = styled(Header)``;
