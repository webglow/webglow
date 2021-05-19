import { faCubes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Wrapper, StyledHierarchyNode, Title } from './styles';
import { Props } from './types';

export default function HierarchyNodeUI({
	node,
	className,
	onSelectNode,
	selectedObject,
}: Props) {
	return (
		<Wrapper className={className}>
			<Title
				onClick={() => onSelectNode(node)}
				selected={selectedObject === node}
			>
				<FontAwesomeIcon icon={faCubes} />
				<div>{node.id}</div>
			</Title>

			{node.children.map((n) => (
				<StyledHierarchyNode
					key={n.id}
					node={n}
					onSelectNode={() => onSelectNode(n)}
					selectedObject={selectedObject}
				></StyledHierarchyNode>
			))}
		</Wrapper>
	);
}
