import File from '../../lib/utils/project-hierarchy/file';
import { ComponentProps } from '../common/types';

export interface Props extends ComponentProps {
	cwd: File;
	onNavigate: (file: File) => void;
}
