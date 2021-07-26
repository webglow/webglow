import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	type?: string;
	autoFocus?: boolean;
	onChange?: (newValue: string) => void;
	value: any;
}
