import styled from 'styled-components';
import { Input } from '../../../../styles/common';
import { pxToRem } from '../../../../styles/helpers';

export const Wrapper = styled.div`
	display: flex;
	flex-flow: column;
`;

export const Name = styled(Input)`
	width: 100%;
	margin-top: ${pxToRem(10)}rem;
`;
