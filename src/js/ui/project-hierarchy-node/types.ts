import { MouseEvent } from 'react';
import File from '../../engine/utils/project-hierarchy/file';
import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	selected?: boolean;
	file: File;
	onClick?: (event: MouseEvent) => void;
	onContextMenu: (event: MouseEvent) => void;
	onDoubleClick?: (event: MouseEvent) => void;
	onRename?: (newName: string) => void;
}

export interface IWrapperProps {
	selected?: boolean;
}
