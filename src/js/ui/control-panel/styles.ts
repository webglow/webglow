import styled from 'styled-components';
import { Button } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	padding: ${pxToRem(5)}rem ${pxToRem(10)}rem;
	border-bottom: 1px solid var(--black);
`;

export const PlayPauseButton = styled(Button)`
	color: var(--white);
	background: var(--grey);
`;

export const SaveButton = styled(Button)`
	margin-left: auto;
	background: var(--green);
	color: var(--dark-grey);
`;
