import styled from 'styled-components';
import HierarchyUI from '../hierarchy';
import Inspector from '../inspector';

export const Wrapper = styled.div`
	display: grid;
	height: 100%;
	grid-template-columns: 2fr 7fr 3fr;
	grid-template-rows: 1fr 1fr;
	background: var(--dark-grey);
`;

export const Canvas = styled.canvas`
	width: 100%;
	min-width: 0;
`;

export const StyledHierarchy = styled(HierarchyUI)`
	grid-row: 1 / 3;
	min-width: 0;
	border-right: 1px solid var(--black);
`;

export const StyledInspector = styled(Inspector)`
	grid-row: 1 / 3;
	grid-column: 3;
	min-width: 0;
	border-left: 1px solid var(--black);
`;
