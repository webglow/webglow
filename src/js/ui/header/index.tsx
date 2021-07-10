import React from 'react';
import { Link, BrowserRouter as Router } from 'react-router-dom';
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
				<PageLink to="/explore">Explore</PageLink>
				<PageLink to="/editor">New Project</PageLink>
				<PageLink to="/documentation">Documentation</PageLink>
			</PageLinks>

			<ButtonsContainer>
				<ActionButton>Save</ActionButton>
			</ButtonsContainer>
		</Wrapper>
	);
}
