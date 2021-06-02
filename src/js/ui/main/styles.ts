import styled from 'styled-components';
import { pxToRem } from '../../../styles/helpers';
import SceneHierarchyUI from '../scene-hierarchy';
import Inspector from '../inspector';
import ProjectHierarchy from '../project-hierarchy';

export const Wrapper = styled.div`
	display: grid;
	height: 100%;
	grid-template-columns: 2fr 7fr 3fr;
	grid-template-rows: ${pxToRem(30)}rem 1fr 1fr;
	background: var(--dark-grey);
`;

export const Canvas = styled.canvas`
	width: 100%;
	min-width: 0;
	grid-row: 2 / 3;
`;

export const StyledProjectHierarchy = styled(ProjectHierarchy)`
	grid-row: 3 / 4;
	border-top: 1px solid var(--black);
`;

export const StyledSceneHierarchy = styled(SceneHierarchyUI)`
	grid-row: 1 / 4;
	min-width: 0;
	border-right: 1px solid var(--black);
`;

export const StyledInspector = styled(Inspector)`
	grid-row: 1 / 4;
	grid-column: 3;
	min-width: 0;
	border-left: 1px solid var(--black);
`;
