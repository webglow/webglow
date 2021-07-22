import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
	Wrapper,
	StyledNavbar,
	StyledEditor,
	StyledExplorePage,
} from './styles';

const Main = () => (
	<Wrapper>
		<Router>
			<StyledNavbar />

			<Switch>
				<Route path="/projects/:id">
					<StyledEditor />
				</Route>
				<Route path="/explore">
					<StyledExplorePage />
				</Route>
			</Switch>
		</Router>
	</Wrapper>
);

export default hot(Main);
