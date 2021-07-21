import React from 'react';
import { IProps } from './types';
import { Logo, PageLink, PageLinks, Wrapper } from './styles';

export default function Header({ className }: IProps) {
	return (
		<Wrapper className={className}>
			<Logo src="../../../../logo-flat.svg" />
			<PageLinks>
				<PageLink to="/explore" activeClassName="page-link--active">
					Explore
				</PageLink>
				<PageLink to="/editor" activeClassName="page-link--active">
					New Project
				</PageLink>
				<PageLink to="/documentation" activeClassName="page-link--active">
					Documentation
				</PageLink>
			</PageLinks>
		</Wrapper>
	);
}
