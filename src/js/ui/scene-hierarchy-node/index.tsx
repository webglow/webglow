import { faChevronRight, faCubes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, useState } from 'react';
import {
	Wrapper,
	StyledHierarchyNode,
	Node,
	IconWrapper,
	Text,
	SelectableArea,
	CollapseButton,
} from './styles';
import { IProps } from './types';

export default function SceneHierarchyNodeUI({
	node,
	className,
	onSelectNode,
	onContextMenu,
	selectedObject,
}: IProps) {
	const [collapsed, setCollapsed] = useState(true);

	return (
		<Wrapper
			className={className}
			onContextMenu={(event: MouseEvent) => onContextMenu(event, node)}
		>
			<Node>
				<SelectableArea
					onClick={() => onSelectNode(node)}
					selected={selectedObject === node}
				>
					<IconWrapper>
						<FontAwesomeIcon icon={faCubes} />
					</IconWrapper>
					<Text>{node.id}</Text>
				</SelectableArea>
				{node.children.length ? (
					<CollapseButton
						onClick={() => setCollapsed(!collapsed)}
						collapsed={collapsed}
					>
						<FontAwesomeIcon icon={faChevronRight} />
					</CollapseButton>
				) : null}
			</Node>

			{!collapsed &&
				node.children.map((n) => (
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
