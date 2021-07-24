import React from 'react';
import styled from 'styled-components';
import { pxToRem } from './helpers';
import theme from './theme';

export const Input = styled.input`
	display: block;
	background: var(--black);
	color: var(--white);
	min-width: 0;
	border: 0;
	height: ${pxToRem(20)}rem;
	padding: ${pxToRem(2)}rem ${pxToRem(4)}rem;
	border-radius: 3px;
	width: auto;
`;

export const TextArea = styled.textarea`
	display: block;
	background: var(--black);
	color: var(--white);
	min-width: 0;
	border: 0;
	padding: ${pxToRem(2)}rem ${pxToRem(4)}rem;
	font-family: ${theme.fonts.basic};
	border-radius: 3px;
	width: auto;
`;

export const Select = styled.select`
	display: block;
	background: var(--black);
	color: var(--white);
	min-width: 0;
	border: 0;
	padding: ${pxToRem(2)}rem ${pxToRem(1)}rem;
	border-radius: 3px;
`;

export const TextWithIcon = styled.div<{ svgWidth?: number }>`
	display: flex;
	align-items: center;

	& svg.svg-inline--fa {
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
	border: 0;
	padding: ${pxToRem(5)}rem ${pxToRem(20)}rem;
	font-family: ${theme.fonts.basic};
	font-weight: bold;
	border-radius: 3px;
	cursor: pointer;
	transition: background 0.2s ease-in-out, filter 0.2s ease-in-out;
	box-shadow: ${theme.boxShadows.soft};
	display: flex;
	align-items: center;
	justify-content: center;

	& > svg.svg-inline--fa {
		width: ${({ svgWidth = 14 }) => pxToRem(svgWidth)}rem;
	}

	& > svg + div {
		margin-left: ${pxToRem(5)}rem;
	}

	&[disabled] {
		background: var(--light-grey);
		color: var(--grey);
	}

	&:not([disabled]):hover {
		filter: saturate(2) brightness(1.2);
	}
`;
