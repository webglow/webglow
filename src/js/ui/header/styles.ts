import {Link} from 'react-router-dom';
import styled from 'styled-components';
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

export const PageLink = styled(Link)`
	border-left: 1px solid var(--black);
	display: flex;
	height: 100%;
	font-size: ${pxToRem(16)}rem;
	align-items: center;
	padding: 0 ${pxToRem(20)}rem;
	cursor: pointer;
	color: var(--white);
	text-decoration: none;
	transition: box-shadow 0.2s ease-in-out;

	&:hover {
		box-shadow: var(--dark-dark-grey) 3px 3px 6px 0px inset,
			var(--grey) -3px -3px 6px 1px inset;
	}

	&:active {
		box-shadow: var(--black) 3px 3px 6px 0px inset,
			#303030 -3px -3px 6px 1px inset;
	}

	&:last-child {
		border-right: 1px solid var(--black);
	}
`;

export const ButtonsContainer = styled.div`
	margin-left: auto;
	margin-right: ${pxToRem(10)}rem;
`;

export const ActionButton = styled.button`
	background: var(--green);
	border: 0;
	color: var(--dark-grey);
	font-weight: bold;
	font-size: ${pxToRem(16)}rem;
	padding: ${pxToRem(5)}rem ${pxToRem(20)}rem;
	font-family: ${theme.fonts.basic};
	border-radius: 3px;
	cursor: pointer;
	transition: background 0.2s ease-in-out;
	box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

	&:hover {
		background: #649f41;
	}

	& + & {
		margin-left: ${pxToRem(10)}rem;
	}
`;
