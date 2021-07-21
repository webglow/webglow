import File from 'engine/utils/project-hierarchy/file';
import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	onSelectFile: (file: File) => void;
	onFileDoubleClick: (file: File) => void;
	onNavigate: (file: File) => void;
	selectedObject: File;
	cwd?: File;
}
