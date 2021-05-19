import GameObject from '../../lib/utils/game-object';
import { ComponentProps } from '../common/types';

export interface Props extends ComponentProps {
	selectedObject: GameObject;
	onNameChange: (node: GameObject, newName: string) => void;
}
