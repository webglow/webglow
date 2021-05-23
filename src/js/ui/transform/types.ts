import { ITransformInfo } from '../../lib/3d/standard/transform/types';
import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	transformInfo?: ITransformInfo;
	onChange: (
		name: keyof ITransformInfo,
		newValue: [number, number, number]
	) => void;
}
