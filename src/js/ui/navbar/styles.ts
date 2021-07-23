import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Button } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';
import theme from '../../../styles/theme';

export const Wrapper = styled.nav`
	display: flex;
	align-items: center;
	border-bottom: 1px solid var(--black);
	box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

export const Logo = styled.img`
	padding-left: ${pxToRem(10)}rem;
`;

export const PageLinks = styled.div`
	margin-left: ${pxToRem(20)}rem;
	height: 100%;
	display: flex;
`;

const Nav = css`
	position: relative;
	border-left: 1px solid var(--black);
	background-color: var(--dark-grey);
	display: flex;
	height: 100%;
	font-size: ${pxToRem(16)}rem;
	align-items: center;
	padding: 0 ${pxToRem(20)}rem;
	cursor: pointer;
	color: var(--white);
	text-decoration: none;
	transition: box-shadow 0.2s ease-in-out;

	&.page-link--active::after {
		content: '';
		position: absolute;
		height: 3px;
		background-color: var(--blue);
		left: 0;
		bottom: 0;
		width: 100%;
	}

	&:hover {
		box-shadow: ${theme.boxShadows.insetSoft};
	}

	&:active {
		box-shadow: ${theme.boxShadows.insetStrong};
	}

	&:last-child {
		border-right: 1px solid var(--black);
	}
`;

export const PageLink = styled(NavLink)`
	${Nav}
`;

export const NavButton = styled.button`
	border: 0;
	${Nav}
`;

export const ButtonsContainer = styled.div`
	margin-left: auto;
	margin-right: ${pxToRem(10)}rem;
`;

export const ActionButton = styled(Button)`
	background: var(--green);
	color: var(--dark-grey);
	font-size: ${pxToRem(16)}rem;
	padding: ${pxToRem(5)}rem ${pxToRem(20)}rem;

	&:hover {
		background: #649f41;
	}

	& + & {
		margin-left: ${pxToRem(10)}rem;
	}
`;
