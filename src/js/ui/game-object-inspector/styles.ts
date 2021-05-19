import styled from 'styled-components';
import { pxToRem } from '../../../styles/helpers';
import ObjectNameEditor from '../object-name-editor';

export const Wrapper = styled.div``;

export const StyledObjectNameEditor = styled(ObjectNameEditor)``;

export const Section = styled.div`
	padding: ${pxToRem(10)}rem;

	& + & {
		border-top: 1px solid var(--black);
	}

	&:last-child {
		border-bottom: 1px solid var(--black);
	}
`;
