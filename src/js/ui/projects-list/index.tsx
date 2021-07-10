import React from 'react';
import { IProps } from './types';
import { Wrapper } from './styles';
import ProjectCard from '../project-card';

export default function ProjectsList({ className, projects }: IProps) {
	return (
		<Wrapper className={className}>
			{projects.map((project) => (
				<ProjectCard key={project._id} project={project} />
			))}
		</Wrapper>
	);
}
