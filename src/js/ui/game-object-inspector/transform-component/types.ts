import { ITransformInfo } from 'engine/standard/transform/types';
import Transform from '../../../engine/standard/transform';
import { IComponentProps } from '../../common/types';

export interface IProps extends IComponentProps {
	transform?: Transform;
	onChange: (
		name: keyof ITransformInfo,
		newValue: [number, number, number]
	) => void;
}
