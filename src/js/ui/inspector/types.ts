import HierarchyNode from '../../lib/utils/hierarchy/node';
import { ComponentProps } from '../common/types';

export interface Props extends ComponentProps {
	selectedNode?: HierarchyNode;
	onNameChange: (node: HierarchyNode, newName: string) => void;
}
