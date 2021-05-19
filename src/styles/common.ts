import React from 'react';
import styled from 'styled-components';
import { pxToRem } from './helpers';

export const Input = styled.input`
	display: block;
	background: var(--black);
	color: var(--white);
	min-width: 0;
	border: 0;
	padding: ${pxToRem(2)}rem;
	border-radius: 3px;
`;

export const TextWithIcon = styled.div<{ svgWidth?: number }>`
	display: flex;
	align-items: center;

	& > svg.svg-inline--fa {
		width: ${({ svgWidth = 14 }) => pxToRem(svgWidth)}rem;
		height: ${({ svgWidth = 14 }) => pxToRem(svgWidth)}rem;
	}

	svg + div {
		margin-left: ${pxToRem(5)}rem;
	}
`;

export const Header = styled(TextWithIcon)`
	font-size: ${pxToRem(18)}rem;
	color: var(--orange);
`;

export const SubHeader = styled((props) =>
	React.createElement(TextWithIcon, { ...props, svgWidth: 12 })
)`
	font-size: ${pxToRem(15)}rem;
	color: var(--blue);
`;

export const SmallText = styled((props) =>
	React.createElement(TextWithIcon, { ...props, svgWidth: 10 })
)`
	font-size: ${pxToRem(13)}rem;
`;

export const Button = styled.button<{ svgWidth?: number }>`
	color: var(--white);
	background: var(--dark-dark-grey);
	border: 0;
	padding: ${pxToRem(3)}rem ${pxToRem(10)}rem;
	border-radius: 3px;
	cursor: pointer;
	transition: background 0.2s ease-in-out;

	&:hover {
		background: var(--black);
	}

	& > svg.svg-inline--fa {
		width: ${({ svgWidth = 14 }) => pxToRem(svgWidth)}rem;
	}
`;
