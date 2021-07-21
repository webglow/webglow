import { IComponentProps } from '../../common/types';

export interface IProps extends IComponentProps {
	name: string;
	onChange: (newName: string) => void;
}
