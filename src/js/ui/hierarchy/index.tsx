import React from 'react';
import HierarchyNodeUI from '../hierarchy-node';
import { NodeList, Title, Wrapper } from './styles';
import { Props } from './types';

export default function HierarchyUI({
	hierarchy,
	className,
	onSelectNode,
	selectedNode,
}: Props) {
	return (
		<Wrapper className={className}>
			<Title>Hierarchy</Title>

			<NodeList>
				{hierarchy.rootNode.children.map((node) => (
					<HierarchyNodeUI
						key={node.id}
						node={node}
						onSelectNode={(n) => onSelectNode(n)}
						selectedNode={selectedNode}
					/>
				))}
			</NodeList>
		</Wrapper>
	);
}
