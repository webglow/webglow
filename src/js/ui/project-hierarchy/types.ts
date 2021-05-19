import File from '../../lib/utils/project-hierarchy/file';
import { ComponentProps } from '../common/types';

export interface Props extends ComponentProps {
	onSelectFile: (file: File) => void;
	selectedObject: File;
}
