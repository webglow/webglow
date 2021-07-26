import styled from 'styled-components';
import { Input, SmallText, Select } from '../../../../styles/common';
import { pxToRem } from '../../../../styles/helpers';
import TextInput from '../../text-input';

export const Wrapper = styled.div``;

export const Settings = styled.div`
	margin-top: ${pxToRem(10)}rem;
	display: grid;
	grid-gap: ${pxToRem(5)}rem;
	grid-template-columns: 10fr 14fr;
`;

export const ParamName = styled(SmallText)``;

export const ParamValueTextInput = styled(TextInput)``;

export const ParamValueInput = styled(Input)``;

export const ParamValueSelect = styled(Select)``;
