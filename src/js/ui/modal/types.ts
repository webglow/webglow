import { ModalProps } from '@material-ui/core';
import { ElementType } from 'react';
import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps, ModalProps {
	title?: string;
	footer?: JSX.Element;
}
