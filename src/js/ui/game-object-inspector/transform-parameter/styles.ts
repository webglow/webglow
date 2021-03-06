import styled from 'styled-components';
import { SmallText } from '../../../../styles/common';
import { pxToRem } from '../../../../styles/helpers';
import TextInput from '../../text-input';

export const Wrapper = styled.div``;

export const ParamName = styled(SmallText)`
	font-size: ${pxToRem(13)}rem;
`;

export const ParamComponents = styled.div`
	display: flex;
	min-width: 0;
`;

export const ParamComponentName = styled(SmallText)`
	&:not(:first-child) {
		margin-left: ${pxToRem(10)}rem;
	}
	font-size: ${pxToRem(13)}rem;
`;

export const ParamComponentValue = styled(TextInput)`
	margin-left: ${pxToRem(5)}rem;
`;
