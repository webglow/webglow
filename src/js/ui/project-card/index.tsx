import React from 'react';
import { IProps } from './types';
import { Description, Image, Info, Title, Wrapper } from './styles';

export default function ProjectCard({ className, project }: IProps) {
	return (
		<Wrapper className={className}>
			<Image src={project.image} />
			<Info>
				<Title>{project.name}</Title>
				<Description>{project.description}</Description>
			</Info>
		</Wrapper>
	);
}
