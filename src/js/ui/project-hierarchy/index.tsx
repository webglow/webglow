import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFileCode,
	faFolder,
	faPalette,
} from '@fortawesome/free-solid-svg-icons';
import File from 'engine/utils/project-hierarchy/file';
import { FileType } from 'engine/utils/project-hierarchy/types';
import { ISceneJSON } from 'engine/standard/scene/types';
import { IProps } from './types';
import { Wrapper, Title, FileUI, Contents, FileName } from './styles';
import { getIconByFileType } from '../helpers';
import Breadcrumbs from '../breadcrumbs';

export default function ProjectHierarchyUI({
	className,
	onSelectFile,
	onOpenScene,
	hierarchy,
	selectedObject,
}: IProps) {
	const [cwd, setCwd] = useState<File>(null);

	useEffect(() => {
		if (!hierarchy) {
			return;
		}

		setCwd(hierarchy.root);
	}, [hierarchy]);

	const handleFileClick = (file: File) => {
		if (file.type !== FileType.Folder && file.type !== FileType.Scene) {
			onSelectFile(file);
		}
	};

	const handleFileDoubleClick = (file: File) => {
		switch (file.type) {
			case FileType.Folder:
				setCwd(file);
				break;
			case FileType.Scene:
				onOpenScene(file.content as ISceneJSON);
				break;
			default:
				break;
		}
	};

	return (
		<Wrapper className={className}>
			<Title>
				<FontAwesomeIcon icon={faFolder} />
				<div>Project</div>
			</Title>
			<Breadcrumbs cwd={cwd} onNavigate={(file) => setCwd(file)} />
			<Contents>
				{cwd &&
					(cwd.content as File[]).map((file) => (
						<FileUI
							key={file.name}
							onClick={() => {
								handleFileClick(file);
							}}
							draggable={file.type !== FileType.Folder}
							onDoubleClick={() => handleFileDoubleClick(file)}
						>
							<FontAwesomeIcon icon={getIconByFileType(file.type)} />
							<FileName>
								{file.name}
								{file.extension}
							</FileName>
						</FileUI>
					))}
			</Contents>
		</Wrapper>
	);
}
