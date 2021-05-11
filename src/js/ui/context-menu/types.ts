import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import React from 'react';
import { ComponentProps } from '../common/types';

export interface Props extends ComponentProps {
	visible?: boolean;
	items: ContextMenuItem[];
	position: [number, number];
	onOutsideClick: () => void;
}

export interface WrapperProps {
	position: [number, number];
}

export interface ContextMenuItem {
	id: string;
	name: string;
	icon: IconDefinition;
	onClick: (event: React.MouseEvent) => void;
}
