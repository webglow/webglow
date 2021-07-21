import styled from 'styled-components';
import { Input, SmallText } from '../../../../styles/common';
import { pxToRem } from '../../../../styles/helpers';

export const Wrapper = styled.div``;

export const ParamsList = styled.div`
	margin-top: ${pxToRem(10)}rem;
	display: grid;
	align-items: center;
	grid-gap: ${pxToRem(5)}rem;
	grid-template-columns: 6fr 18fr;
`;

export const ParamName = styled(SmallText)``;

export const ParamControl = styled(Input)``;
