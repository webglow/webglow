import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	visible?: boolean;
	items: IContextMenuItem[];
	position?: [number, number];
	onOutsideClick?: () => void;
	onContextMenuItemClick?: () => void;
}

export interface IWrapperProps {
	position: [number, number];
}

export interface IContextMenuItem {
	id: string;
	name: string;
	icon: IconDefinition;
	onClick?: (event: React.MouseEvent) => void;
	children?: IContextMenuItem[];
	hasSeparator?: boolean;
}
