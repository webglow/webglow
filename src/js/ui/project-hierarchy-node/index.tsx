import React, { MouseEvent, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IProps } from './types';
import { FileName, FileNameInput, Wrapper } from './styles';
import { FileType } from '../../engine/utils/project-hierarchy/types';
import { getIconByFileType } from '../helpers';

export default function ProjectHierarchyNode({
	className,
	selected,
	onClick,
	onRename,
	onDoubleClick,
	file,
}: IProps) {
	const [isRenaming, setIsRenaming] = useState(false);
	const [newFileName, setNewFileName] = useState<string>();

	const handleFileNameClick = (event: MouseEvent) => {
		if (!selected) {
			return;
		}

		event.stopPropagation();
		setIsRenaming(true);
		setNewFileName(file.name);
	};

	return (
		<Wrapper
			className={className}
			selected={selected}
			key={file.name}
			onClick={onClick}
			title={`${file.name}${file.extension}`}
			draggable={file.type !== FileType.Folder}
			onDoubleClick={(event: MouseEvent) => {
				if (!isRenaming) {
					onDoubleClick(event);
				}
			}}
		>
			<FontAwesomeIcon icon={getIconByFileType(file.type)} />
			{isRenaming ? (
				<FileNameInput
					type="text"
					autoFocus={true}
					value={newFileName}
					onChange={(newValue) => {
						onRename(newValue);
						setIsRenaming(false);
					}}
				/>
			) : (
				<FileName
					onClick={handleFileNameClick}
				>{`${file.name}${file.extension}`}</FileName>
			)}
		</Wrapper>
	);
}
