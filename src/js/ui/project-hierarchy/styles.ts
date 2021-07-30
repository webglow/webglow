import styled from 'styled-components';
import { Header } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';

export const Wrapper = styled.div`
	display: flex;
	flex-flow: column;
`;

export const Title = styled(Header)`
	padding: ${pxToRem(10)}rem;
	border-bottom: 1px solid var(--black);
`;

export const Contents = styled.div`
	display: grid;
	padding: ${pxToRem(10)}rem;
	grid-gap: ${pxToRem(5)}rem;
	grid-template-columns: repeat(auto-fill, ${pxToRem(90)}rem);
`;

export const DropZone = styled.div`
	flex-grow: 1;
	position: relative;
`;

export const DropZoneActive = styled.div`
	position: absolute;
	pointer-events: none;
	top: ${pxToRem(10)}rem;
	left: ${pxToRem(10)}rem;
	right: ${pxToRem(10)}rem;
	bottom: ${pxToRem(10)}rem;
	background: var(--grey);
	font-size: ${pxToRem(30)}rem;
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--orange);

	&[hidden] {
		display: none;
	}
`;
