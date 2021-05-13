import GameObject from '../../lib/utils/game-object';
import { ComponentProps } from '../common/types';

export interface Props extends ComponentProps {
	node: GameObject;
	onSelectNode?: (node: GameObject) => void;
	selectedNode?: GameObject;
}

export interface TitleProps {
	selected: boolean;
}
