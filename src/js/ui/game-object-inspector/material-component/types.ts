import Material from '../../../engine/utils/material';
import { IComponentProps } from '../../common/types';

export interface IProps extends IComponentProps {
	material: Material;
	onParamChange: (key: string, newValue: any) => void;
}
