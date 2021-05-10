import React from 'react';
import { Props } from './types';
import { Wrapper, Name } from './styles';

export default function ObjectNameEditor({ className, name }: Props) {
	return (
		<Wrapper className={className}>
			<Name value={name} />
		</Wrapper>
	);
}
