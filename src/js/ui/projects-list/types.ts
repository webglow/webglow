import { IComponentProps } from '../common/types';
import { IProject } from '../project-card/types';

export interface IProps extends IComponentProps {
	projects: IProject[];
}
