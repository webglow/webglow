import { faChevronRight, faCubes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer } from 'mobx-react';
import React, { MouseEvent, useState } from 'react';
import {
	Wrapper,
	Node,
	IconWrapper,
	Text,
	SelectableArea,
	CollapseButton,
} from './styles';
import { IProps } from './types';

const SceneHierarchyNodeUI = observer(
	({
		node,
		className,
		onSelectNode,
		onContextMenu,
		selectedObject,
	}: IProps) => {
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
						<Text>{node.displayName}</Text>
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
						<SceneHierarchyNodeUI
							key={n.id}
							node={n}
							onSelectNode={onSelectNode}
							onContextMenu={onContextMenu}
							selectedObject={selectedObject}
						></SceneHierarchyNodeUI>
					))}
			</Wrapper>
		);
	}
);

export default SceneHierarchyNodeUI;
