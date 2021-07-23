import styled from 'styled-components';
import { Button, Input, SmallText, TextArea } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';

export const Wrapper = styled.div``;

export const Footer = styled.div`
	display: flex;
`;

export const ButtonsContainer = styled.div`
	margin-left: auto;
	display: flex;
`;

export const CancelButton = styled(Button)`
	background-color: var(--orange);
`;

export const CreateButton = styled(Button)`
	background-color: var(--green);
	margin-left: ${pxToRem(5)}rem;
`;

export const Form = styled.div`
	display: grid;
	grid-template-columns: 6fr 18fr;
	grid-gap: ${pxToRem(5)}rem;
	align-items: flex-start;
`;

export const FieldKey = styled(SmallText)`
	line-height: ${pxToRem(20)}rem;
`;

export const StyledInput = styled(Input)``;

export const StyledTextArea = styled(TextArea)`
	min-height: ${pxToRem(100)}rem;
`;
