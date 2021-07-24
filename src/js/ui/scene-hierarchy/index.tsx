import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent, useState } from 'react';
import { faSitemap } from '@fortawesome/free-solid-svg-icons';
import ContextMenu from '../context-menu';
import { NodeList, Title, Wrapper } from './styles';
import { IProps } from './types';
import SceneHierarchyNodeUI from '../scene-hierarchy-node';
import { getGameObjectActionsMenuItems, getObjectMenuItems } from './helpers';
import { IContextMenuItem } from '../context-menu/types';
import GameObject from '../../engine/utils/game-object';

export default function SceneHierarchyUI({
	hierarchy,
	className,
	onSelectNode,
	selectedObject,
}: IProps) {
	const [menuVisible, setMenuVisible] = useState<boolean>(false);
	const [menuPosition, setMenuPosition] = useState<[number, number]>([0, 0]);
	const [menuItems, setMenuItems] = useState<IContextMenuItem[]>([]);

	const openContextMenu = (
		event: React.MouseEvent,
		_menuItems: IContextMenuItem[]
	) => {
		event.preventDefault();
		event.stopPropagation();

		if (!hierarchy) {
			return;
		}

		setMenuPosition([event.clientX, event.clientY]);
		setMenuItems(_menuItems);
		setMenuVisible(true);
	};

	return (
		<Wrapper
			className={className}
			onContextMenu={(event: MouseEvent) =>
				openContextMenu(event, getObjectMenuItems(hierarchy))
			}
		>
			<Title>
				<FontAwesomeIcon icon={faSitemap} />
				<div>Scene Hierarchy</div>
			</Title>

			{hierarchy && (
				<NodeList>
					{hierarchy.root.children.map((node) => (
						<SceneHierarchyNodeUI
							key={node.id}
							node={node}
							onSelectNode={(n) => onSelectNode(n)}
							onContextMenu={(event: MouseEvent, n: GameObject) =>
								openContextMenu(event, [
									...getGameObjectActionsMenuItems(hierarchy, n),
									...getObjectMenuItems(hierarchy, n),
								])
							}
							selectedObject={selectedObject}
						/>
					))}
				</NodeList>
			)}

			<ContextMenu
				onOutsideClick={() => setMenuVisible(false)}
				items={menuItems}
				onContextMenuItemClick={() => setMenuVisible(false)}
				visible={menuVisible}
				position={menuPosition}
			></ContextMenu>
		</Wrapper>
	);
}
