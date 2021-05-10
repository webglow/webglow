import React from 'react';
import { Wrapper, StyledHierarchyNode, Title } from './styles';
import { Props } from './types';

export default function HierarchyNodeUI({
	node,
	className,
	onSelectNode,
	selectedNode,
}: Props) {
	return (
		<Wrapper className={className}>
			<Title
				onClick={() => onSelectNode(node)}
				selected={selectedNode === node}
			>
				#{node.id}
			</Title>

			{node.children.map((n) => (
				<StyledHierarchyNode
					key={n.id}
					node={n}
					onSelectNode={() => onSelectNode(n)}
					selectedNode={selectedNode}
				></StyledHierarchyNode>
			))}
		</Wrapper>
	);
}
