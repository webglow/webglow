import React, { useEffect, useState } from 'react';
import { IProps } from './types';
import { Wrapper } from './styles';
import ProjectsList from '../projects-list';
import { IProject } from '../project-card/types';

export default function ExplorePage({ className }: IProps) {
	const [projects, setProjects] = useState<IProject[]>([]);

	useEffect(() => {
		fetch(`${API_URL}/projects`)
			.then((response) => response.json())
			.then((_projects: IProject[]) => setProjects(_projects));
	}, []);

	return (
		<Wrapper className={className}>
			<ProjectsList projects={projects} />
		</Wrapper>
	);
}
