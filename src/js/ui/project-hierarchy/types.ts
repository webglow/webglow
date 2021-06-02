import Scene from 'engine/standard/scene';
import ProjectHierarchy from 'engine/utils/project-hierarchy';
import File from 'engine/utils/project-hierarchy/file';
import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	onSelectFile: (file: File) => void;
	onOpenScene: (scene: Scene) => void;
	selectedObject: File;
	hierarchy: ProjectHierarchy;
}
