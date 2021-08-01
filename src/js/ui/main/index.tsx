import { StylesProvider } from '@material-ui/styles';
import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
	useHistory,
} from 'react-router-dom';
import NewProjectModal from '../new-project-modal';
import {
	Wrapper,
	StyledNavbar,
	StyledEditor,
	StyledExplorePage,
} from './styles';
import { INewProject } from './types';

const Main = () => {
	const history = useHistory();
	const [newProjectModalOpen, setNewProjectModalOpen] = useState(false);

	const createProject = (project: INewProject) => {
		fetch(`${API_URL}/projects`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(project),
		})
			.then((response) => response.json())
			.then((_project) => history.push(`/projects/${_project._id}`));
	};

	return (
		<StylesProvider injectFirst>
			<Wrapper blurred={newProjectModalOpen}>
				<StyledNavbar onNewProject={() => setNewProjectModalOpen(true)} />

				<Switch>
					<Route exact path="/" render={() => <Redirect to="/explore" />} />
					<Route path="/projects/:id">
						<StyledEditor />
					</Route>
					<Route path="/explore">
						<StyledExplorePage />
					</Route>
				</Switch>
				<NewProjectModal
					open={newProjectModalOpen}
					onClose={() => setNewProjectModalOpen(false)}
					onCancel={() => setNewProjectModalOpen(false)}
					onCreate={(project) => {
						setNewProjectModalOpen(false);
						createProject(project);
					}}
				>
					<div>Hello</div>
				</NewProjectModal>
			</Wrapper>
		</StylesProvider>
	);
};

export default hot(Main);
