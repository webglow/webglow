import React from 'react';
import { IProps } from './types';
import {
	ActionButton,
	ButtonsContainer,
	Logo,
	PageLink,
	PageLinks,
	Wrapper,
} from './styles';

export default function Header({ className }: IProps) {
	return (
		<Wrapper className={className}>
			<Logo src="../../../../logo-flat.svg" />
			<PageLinks>
				<PageLink>Explore</PageLink>
				<PageLink>New Project</PageLink>
				<PageLink>Documentation</PageLink>
			</PageLinks>

			<ButtonsContainer>
				<ActionButton>Save</ActionButton>
			</ButtonsContainer>
		</Wrapper>
	);
}
