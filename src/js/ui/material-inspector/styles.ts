import styled from 'styled-components';
import { Input, SmallText } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';
import TextInput from '../text-input';

export const Wrapper = styled.div`
	padding: ${pxToRem(10)}rem;
`;

export const ParamsList = styled.div`
	display: grid;
	align-items: center;
	grid-gap: ${pxToRem(5)}rem;
	margin-top: ${pxToRem(10)}rem;
	grid-template-columns: 10fr 14fr;
`;

export const ParamName = styled(SmallText)``;

export const ParamControl = styled(Input)``;

export const TextParamControl = styled(TextInput)``;

export const ParamValue = styled.div`
	background: var(--black);
	padding: ${pxToRem(2)}rem ${pxToRem(4)}rem;
	border-radius: 3px;
`;
