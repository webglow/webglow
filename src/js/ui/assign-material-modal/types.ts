import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	onCancel: () => void;
	onClose?: {
		bivarianceHack(event: {}, reason: 'backdropClick' | 'escapeKeyDown'): void;
	}['bivarianceHack'];
	open: boolean;
	assignedMaterialId: string;
	onConfirm: (materialId: string) => void;
}

export interface IMaterialItemProps {
	selected: boolean;
}
