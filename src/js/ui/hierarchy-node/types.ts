import GameObject from '../../lib/utils/game-object';
import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	node: GameObject;
	onSelectNode?: (node: GameObject) => void;
	selectedObject?: GameObject;
}

export interface ITitleProps {
	selected: boolean;
}
