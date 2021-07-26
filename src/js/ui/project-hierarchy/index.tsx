import React, { MouseEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import File from 'engine/utils/project-hierarchy/file';
import { IProps } from './types';
import { Wrapper, Title, Contents } from './styles';
import Breadcrumbs from '../breadcrumbs';
import ContextMenu from '../context-menu';
import { IContextMenuItem } from '../context-menu/types';
import { getCreateFileItems } from './helpers';
import ProjectHierarchyNode from '../project-hierarchy-node';

export default function ProjectHierarchyUI({
	className,
	onSelectFile,
	selectedFile,
	onFileDoubleClick,
	onNavigate,
	cwd,
}: IProps) {
	const [menuVisible, setMenuVisible] = useState<boolean>(false);
	const [menuItems, setMenuItems] = useState<IContextMenuItem[]>([]);
	const [menuPosition, setMenuPosition] = useState<[number, number]>([0, 0]);

	const openContextMenu = (
		event: React.MouseEvent,
		_menuItems: IContextMenuItem[]
	) => {
		event.preventDefault();
		event.stopPropagation();

		setMenuPosition([event.clientX, event.clientY]);
		setMenuItems(_menuItems);
		setMenuVisible(true);
	};

	const handleFileClick = (file: File) => {
		onSelectFile(file);
	};

	return (
		<Wrapper
			className={className}
			onContextMenu={(event: MouseEvent) =>
				openContextMenu(event, getCreateFileItems(cwd))
			}
		>
			<Title>
				<FontAwesomeIcon icon={faFolder} />
				<div>Project</div>
			</Title>
			<Breadcrumbs cwd={cwd} onNavigate={onNavigate} />
			<Contents>
				{cwd &&
					(cwd.content as File[]).map((file) => (
						<ProjectHierarchyNode
							file={file}
							selected={file === selectedFile}
							onRename={(newFileName: string) => {
								if (newFileName) {
									file.name = newFileName;
								}
							}}
							key={file.name}
							onClick={() => {
								handleFileClick(file);
							}}
							onDoubleClick={() => onFileDoubleClick(file)}
						/>
					))}
			</Contents>

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
