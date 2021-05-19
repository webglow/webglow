import {
	faFileCode,
	faFolder,
	faPalette,
} from '@fortawesome/free-solid-svg-icons';
import { FileType } from '../../lib/utils/project-hierarchy/types';

export const getIconByFileType = (type: FileType) => {
	switch (type) {
		case FileType.Folder:
			return faFolder;
		case FileType.Script:
			return faFileCode;
		case FileType.Shader:
			return faPalette;
		default:
			break;
	}
};
