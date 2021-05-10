---
to: src/js/ui/<%= h.changeCase.paramCase(name) %>/index.tsx
---
import React from 'react';
import { Props } from './types';
import { Wrapper } from './styles';

export default function <%= name %>({ className }: Props) {
	return <Wrapper className={className}>Hello</Wrapper>;
}
