import { TransformInfo } from '../../lib/3d/standard/transform/types';
import { ComponentProps } from '../common/types';

export interface Props extends ComponentProps {
	name: keyof TransformInfo;
	onChange: (param: [number, number, number]) => void;
	value: [number, number, number];
}
