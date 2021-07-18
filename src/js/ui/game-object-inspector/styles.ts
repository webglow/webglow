import styled from 'styled-components';
import { Button } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';
import ObjectNameEditor from '../object-name-editor';

export const Wrapper = styled.div`
	display: flex;
	flex-flow: column;
`;

export const StyledObjectNameEditor = styled(ObjectNameEditor)``;

export const Section = styled.div`
	padding: ${pxToRem(10)}rem;

	& + & {
		border-top: 1px solid var(--black);
	}
`;

export const AddComponentButton = styled(Button)`
	background-color: var(--blue);
	color: var(--black);
	width: 100%;

	&:hover {
		background-color: #139de7;
	}
`;
