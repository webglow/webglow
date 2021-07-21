import styled from 'styled-components';
import { SmallText } from '../../../../styles/common';
import { pxToRem } from '../../../../styles/helpers';

export const Wrapper = styled.div``;

export const ScriptName = styled(SmallText)`
	margin-top: ${pxToRem(10)}rem;
	padding: ${pxToRem(3)}rem ${pxToRem(4)}rem;
	border-radius: 3px;
	cursor: pointer;
	background: var(--dark-grey);
	transition: background 0.2s ease-in-out;

	&:hover {
		background: var(--black);
	}
`;
