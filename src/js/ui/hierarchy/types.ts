import GameObject from '../../lib/utils/game-object';
import Hierarchy from '../../lib/utils/hierarchy';
import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	hierarchy: Hierarchy;
	onSelectNode: (node: GameObject) => void;
	selectedObject?: GameObject;
}
