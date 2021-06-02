import GameObject from 'engine/utils/game-object';
import File from 'engine/utils/project-hierarchy/file';
import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	selectedObject?: GameObject | File;
	onNameChange: (node: GameObject, newName: string) => void;
}
