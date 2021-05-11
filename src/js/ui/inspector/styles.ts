import styled from 'styled-components';
import { Header } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';
import ObjectNameEditor from '../object-name-editor';

export const Wrapper = styled.div``;

export const Title = styled(Header)``;

export const StyledObjectNameEditor = styled(ObjectNameEditor)`
	margin-top: ${pxToRem(10)}rem;
`;

export const Section = styled.div`
	padding: ${pxToRem(10)}rem;

	& + & {
		border-top: 1px solid var(--black);
	}

	&:last-child {
		border-bottom: 1px solid var(--black);
	}
`;
