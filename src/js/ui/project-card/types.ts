import { IProjectJSON } from '../../engine/utils/project-hierarchy/types';
import { IComponentProps } from '../common/types';

export interface IProject {
	_id: number;
	name: string;
	description: string;
	image: string;
	hierarchy: IProjectJSON;
}

export interface IProps extends IComponentProps {
	project: IProject;
}
