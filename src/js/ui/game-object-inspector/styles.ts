import styled from 'styled-components';
import { pxToRem } from '../../../styles/helpers';
import ObjectNameEditorComponent from './object-name-editor-component';

export const Wrapper = styled.div`
	display: flex;
	flex-flow: column;
`;

export const StyledObjectNameEditor = styled(ObjectNameEditorComponent)``;

export const Section = styled.div`
	padding: ${pxToRem(10)}rem;

	& + & {
		border-top: 1px solid var(--black);
	}
`;
