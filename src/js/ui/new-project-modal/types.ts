import { IComponentProps } from '../common/types';
import { INewProject } from '../main/types';

export interface IProps extends IComponentProps {
	onCancel: () => void;
	onCreate: (project: INewProject) => void;
	onClose?: {
		bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
	}['bivarianceHack'];
	open: boolean;
}
