import styled from 'styled-components';
import { Header } from '../../../styles/common';
import { pxToRem } from '../../../styles/helpers';
import SceneHierarchyNodeUI from '../scene-hierarchy-node';

export const Wrapper = styled.div``;

export const Title = styled(Header)`
	border-bottom: 1px solid var(--black);
	padding: ${pxToRem(10)}rem;
`;

export const NodeList = styled.div`
	padding: ${pxToRem(10)}rem;
`;

export const StyledNode = styled(SceneHierarchyNodeUI)`
	& + & {
		margin-top: ${pxToRem(5)}rem;
	}
`;
