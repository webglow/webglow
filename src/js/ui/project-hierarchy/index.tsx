import React, { DragEvent, MouseEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import File from 'engine/utils/project-hierarchy/file';
import { observer } from 'mobx-react';
import { IProps } from './types';
import { Wrapper, Title, Contents, DropZone, DropZoneActive } from './styles';
import Breadcrumbs from '../breadcrumbs';
import ContextMenu from '../context-menu';
import { IContextMenuItem } from '../context-menu/types';
import { getCreateFileItems, getFileActionItems } from './helpers';
import ProjectHierarchyNode from '../project-hierarchy-node';
import { FileType } from '../../engine/utils/project-hierarchy/types';
import Model from '../../engine/utils/model';

const ProjectHierarchyUI = observer(
	({
		className,
		onSelectFile,
		selectedFile,
		onFileDoubleClick,
		onNavigate,
		cwd,
	}: IProps) => {
		const [menuVisible, setMenuVisible] = useState<boolean>(false);
		const [menuItems, setMenuItems] = useState<IContextMenuItem[]>([]);
		const [menuPosition, setMenuPosition] = useState<[number, number]>([0, 0]);
		const [dragOver, setDragOver] = useState(false);

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

		const handleDragOver = (event: DragEvent) => {
			event.stopPropagation();
			event.preventDefault();
			event.dataTransfer.dropEffect = 'copy';
			setDragOver(true);
		};

		const handleDrop = (event: DragEvent) => {
			event.preventDefault();
			event.stopPropagation();
			setDragOver(false);

			const { files } = event.dataTransfer;

			Array.from(files).forEach((file) => {
				const fileNameParts = file.name.split('.');
				const extension = fileNameParts.pop();
				const fileName = fileNameParts.join('.');

				if (extension !== 'obj') {
					return;
				}

				const reader = new FileReader();

				reader.onload = function (e: ProgressEvent<FileReader>) {
					cwd.addChild(
						new File(
							fileName,
							FileType.Model,
							JSON.stringify(new Model(e.target.result as string).toJSON())
						)
					);
				};

				reader.readAsText(file);
			});
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
				<DropZone
					onDragOver={handleDragOver}
					onDragLeave={(event: DragEvent) => {
						setDragOver(false);
					}}
					onDrop={handleDrop}
				>
					<Contents>
						{cwd &&
							cwd.children.map((file) => (
								<ProjectHierarchyNode
									file={file}
									selected={file === selectedFile}
									onContextMenu={(event) =>
										openContextMenu(event, [
											...getFileActionItems(file),
											...getCreateFileItems(cwd),
										])
									}
									onRename={(newFileName: string) => {
										if (newFileName) {
											file.rename(newFileName);
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
					<DropZoneActive hidden={!dragOver}>Drop Files Here</DropZoneActive>
				</DropZone>

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
);

export default ProjectHierarchyUI;
