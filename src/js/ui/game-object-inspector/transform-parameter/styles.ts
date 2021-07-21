import styled from 'styled-components';
import { Input, SmallText } from '../../../../styles/common';
import { pxToRem } from '../../../../styles/helpers';

export const Wrapper = styled.div``;

export const ParamName = styled(SmallText)`
	font-size: ${pxToRem(13)}rem;
`;

export const ParamComponentName = styled(SmallText)`
	margin-left: ${pxToRem(10)}rem;
	font-size: ${pxToRem(13)}rem;
`;

export const ParamComponentValue = styled(Input)`
	margin-left: ${pxToRem(5)}rem;
`;
