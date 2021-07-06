import { ISceneJSON } from 'engine/standard/scene/types';
import ProjectHierarchy from 'engine/utils/project-hierarchy';
import File from 'engine/utils/project-hierarchy/file';
import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	onSelectFile: (file: File) => void;
	onOpenScene: (sceneData: ISceneJSON) => void;
	selectedObject: File;
	hierarchy: ProjectHierarchy;
}
