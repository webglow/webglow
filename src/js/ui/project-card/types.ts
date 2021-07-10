import { IComponentProps } from '../common/types';

export interface IProject {
	_id: number;
	name: string;
	description: string;
	image: string;
}

export interface IProps extends IComponentProps {
	project: IProject;
}
