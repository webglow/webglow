import { ITransformInfo } from 'engine/standard/transform/types';
import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	name: keyof ITransformInfo;
	onChange: (param: [number, number, number]) => void;
	value: [number, number, number];
}
