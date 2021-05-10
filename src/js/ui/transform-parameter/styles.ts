import styled from 'styled-components';
import { Input } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';

export const Wrapper = styled.div``;

export const ParamName = styled.div`
	text-transform: capitalize;
`;

export const ParamComponentName = styled.div`
	margin-left: ${pxToRem(10)}rem;
`;

export const ParamComponentValue = styled(Input)`
	margin-left: ${pxToRem(5)}rem;
`;
