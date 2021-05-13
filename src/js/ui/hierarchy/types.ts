import GameObject from '../../lib/utils/game-object';
import Hierarchy from '../../lib/utils/hierarchy';
import { ComponentProps } from '../common/types';

export interface Props extends ComponentProps {
	hierarchy: Hierarchy;
	onSelectNode: (node: GameObject) => void;
	selectedNode?: GameObject;
}
