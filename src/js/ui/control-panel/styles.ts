import styled from 'styled-components';
import { Button } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 0 ${pxToRem(10)}rem;
`;

export const PlayPauseButton = styled(Button)`
	margin-left: auto;
	color: var(--white);
	background: var(--dark-dark-grey);

	&:hover {
		background: var(--black);
	}
`;
