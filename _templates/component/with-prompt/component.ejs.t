---
to: src/js/ui/<%= h.changeCase.paramCase(name) %>/index.tsx
---
import React from 'react';
import { IProps } from './types';
import { Wrapper } from './styles';

export default function <%= name %>({ className }: IProps) {
	return (
		<Wrapper className={className}>
			Hello
		</Wrapper>
	);
}
