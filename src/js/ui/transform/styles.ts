import styled from 'styled-components';
import { SubHeader } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';

export const Wrapper = styled.div``;

export const Title = styled(SubHeader)``;

export const Info = styled.div`
	display: grid;
	--input-size: 5fr;
	grid-template-columns: 6fr 1fr var(--input-size) 1fr var(--input-size) 1fr var(
			--input-size
		);
	align-items: center;
	margin-top: ${pxToRem(10)}rem;
	grid-row-gap: ${pxToRem(5)}rem;
`;
