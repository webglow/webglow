import { faCubes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent } from 'react';
import { Wrapper, StyledHierarchyNode, Title } from './styles';
import { IProps } from './types';

export default function SceneHierarchyNodeUI({
	node,
	className,
	onSelectNode,
	onContextMenu,
	selectedObject,
}: IProps) {
	return (
		<Wrapper
			className={className}
			onContextMenu={(event: MouseEvent) => onContextMenu(event, node)}
		>
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
					onSelectNode={onSelectNode}
					onContextMenu={onContextMenu}
					selectedObject={selectedObject}
				></StyledHierarchyNode>
			))}
		</Wrapper>
	);
}
