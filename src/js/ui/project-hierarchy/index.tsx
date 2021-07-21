import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import File from 'engine/utils/project-hierarchy/file';
import { FileType } from 'engine/utils/project-hierarchy/types';
import { IProps } from './types';
import { Wrapper, Title, FileUI, Contents, FileName } from './styles';
import { getIconByFileType } from '../helpers';
import Breadcrumbs from '../breadcrumbs';

export default function ProjectHierarchyUI({
	className,
	onSelectFile,
	onFileDoubleClick,
	onNavigate,
	cwd,
}: IProps) {
	const handleFileClick = (file: File) => {
		if (file.type !== FileType.Folder && file.type !== FileType.Scene) {
			onSelectFile(file);
		}
	};

	return (
		<Wrapper className={className}>
			<Title>
				<FontAwesomeIcon icon={faFolder} />
				<div>Project</div>
			</Title>
			<Breadcrumbs cwd={cwd} onNavigate={onNavigate} />
			<Contents>
				{cwd &&
					(cwd.content as File[]).map((file) => (
						<FileUI
							key={file.name}
							onClick={() => {
								handleFileClick(file);
							}}
							draggable={file.type !== FileType.Folder}
							onDoubleClick={() => onFileDoubleClick(file)}
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
