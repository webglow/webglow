import Hierarchy from '../../lib/utils/hierarchy';
import HierarchyNode from '../../lib/utils/hierarchy/node';
import { ComponentProps } from '../common/types';

export interface Props extends ComponentProps {
	hierarchy: Hierarchy;
	onSelectNode: (node: HierarchyNode) => void;
	selectedNode?: HierarchyNode;
}
