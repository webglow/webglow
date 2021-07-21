import Light from '../../../engine/standard/light';
import { LightType } from '../../../engine/standard/light/types';
import { IComponentProps } from '../../common/types';

export interface IProps extends IComponentProps {
	light: Light;
	onChange: (key: keyof Light, newValue: number | string | LightType) => void;
}
