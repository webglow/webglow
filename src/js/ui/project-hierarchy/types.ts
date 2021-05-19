import File from '../../lib/utils/project-hierarchy/file';
import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	onSelectFile: (file: File) => void;
	selectedObject: File;
}
