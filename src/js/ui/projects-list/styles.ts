import styled from 'styled-components';
import { pxToRem } from '../../../styles/helpers';

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	width: 70%;
	grid-gap: ${pxToRem(10)}rem;
	margin: ${pxToRem(20)}rem auto;
`;
