import styled from 'styled-components';
import { pxToRem } from '../../../../styles/helpers';
import TextInput from '../../text-input';

export const Wrapper = styled.div`
	display: flex;
	flex-flow: column;
`;

export const Name = styled(TextInput)`
	width: 100%;
	margin-top: ${pxToRem(10)}rem;
`;
