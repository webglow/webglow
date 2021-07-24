import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { MouseEvent } from 'react';
import { IComponentProps } from '../common/types';
import { IContextMenuItem } from '../context-menu/types';

export interface IProps extends IComponentProps {
	onClick?: (event: MouseEvent) => void;
	icon?: IconProp;
	name: string;
	children?: IContextMenuItem[];
}
