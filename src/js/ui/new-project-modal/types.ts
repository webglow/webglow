import { ModalProps } from '@material-ui/core';
import { IComponentProps } from '../common/types';
import { INewProject } from '../main/types';

export interface IProps extends IComponentProps, ModalProps {
	onCancel: () => void;
	onCreate: (project: INewProject) => void;
}
