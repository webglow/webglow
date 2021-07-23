import styled from 'styled-components';
import { pxToRem } from '../../../styles/helpers';
import ControlPanel from '../control-panel';
import Inspector from '../inspector';
import ProjectHierarchyUI from '../project-hierarchy';
import SceneHierarchyUI from '../scene-hierarchy';

export const Wrapper = styled.div`
	background: var(--dark-grey);
	display: grid;
	grid-template-columns: 2fr 7fr 3fr;
	grid-template-rows: ${pxToRem(43)}rem 1fr 1fr;
`;

export const StyledControlPanel = styled(ControlPanel)`
	grid-row: 1 / 2;
`;

export const CanvasContainer = styled.div`
	width: 100%;
	height: 100%;
	min-width: 0;
	position: relative;
`;

export const Canvas = styled.canvas`
	width: 100%;
	height: 100%;
	min-width: 0;
	grid-row: 2 / 3;
`;

export const NoActiveCamera = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: var(--black);
	font-size: ${pxToRem(25)}rem;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const StyledProjectHierarchy = styled(ProjectHierarchyUI)`
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
