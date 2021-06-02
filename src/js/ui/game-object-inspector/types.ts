import GameObject from 'engine/utils/game-object';
import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	selectedObject: GameObject;
	onNameChange: (node: GameObject, newName: string) => void;
}
