import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
	Wrapper,
	StyledHeader,
	StyledEditor,
	StyledExplorePage,
} from './styles';

const Main = () => (
	<Wrapper>
		<Router>
			<StyledHeader />

			<Route path="/projects/:id">
				<StyledEditor />
			</Route>
			<Route path="/explore">
				<StyledExplorePage />
			</Route>
		</Router>
	</Wrapper>
);

export default hot(Main);
