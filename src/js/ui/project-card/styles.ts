import styled from 'styled-components';
import { Header } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';

export const Wrapper = styled.div`
	box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
	border: 1px solid var(--black);
	border-radius: 3px;
	background: var(--grey);
	cursor: pointer;
	transition: box-shadow 0.2s ease-in-out, background 0.2s ease-in-out,
		transform 0.1s ease-in-out;

	&:hover {
		box-shadow: rgba(0, 0, 0, 0.15) 4.95px 4.95px 5.6px;
		transform: scale(1.01);
	}
`;

export const Image = styled.img`
	width: 100%;
	border-radius: 3px 3px 0 0;
	display: block;
`;

export const Info = styled.div`
	padding: ${pxToRem(10)}rem;
`;

export const Title = styled(Header)`
	justify-content: center;
`;

export const Description = styled.div`
	margin-top: ${pxToRem(5)}rem;
	color: var(--white);
`;
