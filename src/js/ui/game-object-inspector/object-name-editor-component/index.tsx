import React from 'react';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import { Wrapper, Name } from './styles';
import ComponentTitle from '../component-title';

export default function ObjectNameEditorComponent({
	className,
	name,
	onChange,
}: IProps) {
	return (
		<Wrapper className={className}>
			<ComponentTitle icon={faStickyNote} title="Name" />

			<Name value={name} onChange={(newValue) => onChange(newValue)} />
		</Wrapper>
	);
}
