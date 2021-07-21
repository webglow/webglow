import styled from 'styled-components';
import { pxToRem } from '../../../../styles/helpers';

export const Wrapper = styled.div``;

export const Info = styled.div`
	display: grid;
	--input-size: 3fr;
	grid-template-columns: 10fr 14fr;
	align-items: center;
	margin-top: ${pxToRem(10)}rem;
	grid-row-gap: ${pxToRem(5)}rem;
`;
