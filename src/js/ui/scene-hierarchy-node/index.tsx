import { faCubes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent } from 'react';
import {
	Wrapper,
	StyledHierarchyNode,
	Node,
	IconWrapper,
	Text,
} from './styles';
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
			<Node
				onClick={() => onSelectNode(node)}
				selected={selectedObject === node}
			>
				<IconWrapper>
					<FontAwesomeIcon icon={faCubes} />
				</IconWrapper>
				<Text>{node.id}</Text>
			</Node>

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
