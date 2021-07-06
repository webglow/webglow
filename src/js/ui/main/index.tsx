import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Wrapper, StyledHeader, StyledEditor } from './styles';

const Main = () => (
	<Wrapper>
		<StyledHeader />

		<StyledEditor />
	</Wrapper>
);

export default hot(Main);
