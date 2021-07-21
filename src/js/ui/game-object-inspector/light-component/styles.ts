import styled from 'styled-components';
import { Input, SmallText, Select } from '../../../../styles/common';
import { pxToRem } from '../../../../styles/helpers';

export const Wrapper = styled.div``;

export const Settings = styled.div`
	margin-top: ${pxToRem(10)}rem;
	display: grid;
	grid-gap: ${pxToRem(5)}rem;
	grid-template-columns: 6fr 18fr;
`;

export const ParamName = styled(SmallText)``;

export const ParamValueInput = styled(Input)``;

export const ParamValueSelect = styled(Select)``;
