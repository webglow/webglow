import React from 'react';
import { IProps } from './types';
import { Logo, NavButton, PageLink, PageLinks, Wrapper } from './styles';

export default function Navbar({ className, onNewProject }: IProps) {
	return (
		<Wrapper className={className}>
			<Logo src="../../../../logo-flat.svg" />
			<PageLinks>
				<PageLink to="/explore" activeClassName="page-link--active">
					Explore
				</PageLink>
				<NavButton onClick={() => onNewProject()}>New Project</NavButton>
				<PageLink to="/documentation" activeClassName="page-link--active">
					Documentation
				</PageLink>
			</PageLinks>
		</Wrapper>
	);
}
