import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import {
	faCircle,
	faCube,
	faSitemap,
	faSquare,
} from '@fortawesome/free-solid-svg-icons';
import ContextMenu from '../context-menu';
import { IContextMenuItem } from '../context-menu/types';
import { NodeList, Title, Wrapper } from './styles';
import { IProps } from './types';
import SceneHierarchyNodeUI from '../scene-hierarchy-node';
import {
	addBox,
	addPlane,
	addSphere,
} from '../../engine/utils/helpers/default-shapes';

export default function SceneHierarchyUI({
	hierarchy,
	className,
	onSelectNode,
	selectedObject,
}: IProps) {
	const [menuVisible, setMenuVisible] = useState<boolean>(false);
	const [menuPosition, setMenuPosition] = useState<[number, number]>([0, 0]);

	const contextMenuItems: IContextMenuItem[] = [
		{
			id: 'add-box',
			name: 'Add Box',
			icon: faCube,
			onClick() {
				addBox(hierarchy);

				setMenuVisible(false);
			},
		},
		{
			id: 'add-sphere',
			name: 'Add Sphere',
			icon: faCircle,
			onClick() {
				addSphere(hierarchy);

				setMenuVisible(false);
			},
		},
		{
			id: 'add-plane',
			name: 'Add Plane',
			icon: faSquare,
			onClick() {
				addPlane(hierarchy);

				setMenuVisible(false);
			},
		},
	];

	const openContextMenu = (event: React.MouseEvent) => {
		event.preventDefault();
		setMenuVisible(true);
		setMenuPosition([event.clientX, event.clientY]);
	};

	return (
		<Wrapper className={className} onContextMenu={openContextMenu}>
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
							selectedObject={selectedObject}
						/>
					))}
				</NodeList>
			)}

			<ContextMenu
				onOutsideClick={() => setMenuVisible(false)}
				items={contextMenuItems}
				visible={menuVisible}
				position={menuPosition}
			></ContextMenu>
		</Wrapper>
	);
}
