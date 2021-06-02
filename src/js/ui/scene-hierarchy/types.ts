import GameObject from 'engine/utils/game-object';
import SceneHierarchy from 'engine/utils/scene-hierarchy';
import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	hierarchy: SceneHierarchy;
	onSelectNode: (node: GameObject) => void;
	selectedObject?: GameObject;
}
