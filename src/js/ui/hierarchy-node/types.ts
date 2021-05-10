import HierarchyNode from '../../lib/utils/hierarchy/node';
import { ComponentProps } from '../common/types';

export interface Props extends ComponentProps {
	node: HierarchyNode;
	onSelectNode?: (node: HierarchyNode) => void;
	selectedNode?: HierarchyNode;
}

export interface TitleProps {
	selected: boolean;
}
