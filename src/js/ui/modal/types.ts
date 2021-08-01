import { ModalProps } from '@material-ui/core';
import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps, ModalProps {
	title?: string;
	minWidth?: number;
	minHeight?: number;
	footer?: JSX.Element;
}

export interface IModalBodyProps {
	minWidth?: number;
	minHeight?: number;
}
