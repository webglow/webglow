import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IComponentProps } from '../../common/types';

export interface IProps extends IComponentProps {
	icon: IconProp;
	title: string;
}
