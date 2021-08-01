import {
	faFileCode,
	faFolder,
	faGlobeAmericas,
	faPalette,
	faTh,
	faTint,
} from '@fortawesome/free-solid-svg-icons';
import { FileType } from 'engine/utils/project-hierarchy/types';

export const getIconByFileType = (type: FileType) => {
	switch (type) {
		case FileType.Folder:
			return faFolder;
		case FileType.Script:
			return faFileCode;
		case FileType.Shader:
			return faPalette;
		case FileType.Scene:
			return faGlobeAmericas;
		case FileType.Model:
			return faTh;
		case FileType.Material:
			return faTint;
		default:
			break;
	}
};
