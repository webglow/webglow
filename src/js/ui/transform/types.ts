import { TransformInfo } from '../../lib/3d/standard/transform/types';
import { ComponentProps } from '../common/types';

export interface Props extends ComponentProps {
	transformInfo?: TransformInfo;
	onChange: (transform: TransformInfo) => void;
}
