import GameObject from 'engine/utils/game-object';
import { MouseEvent } from 'react';
import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	onContextMenu?: (event: MouseEvent, node: GameObject) => void;
	node: GameObject;
	onSelectNode?: (node: GameObject) => void;
	selectedObject?: GameObject;
}

export interface ITitleProps {
	selected: boolean;
}

export interface ICollapseButtonProps {
	collapsed: boolean;
}
