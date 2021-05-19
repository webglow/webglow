import GameObject from '../../lib/utils/game-object';
import File from '../../lib/utils/project-hierarchy/file';
import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	selectedObject?: GameObject | File;
	onNameChange: (node: GameObject, newName: string) => void;
}
