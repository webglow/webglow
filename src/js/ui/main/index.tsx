import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
