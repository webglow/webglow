import {
	faFile,
	faFileCode,
	faFolder,
	faGlobeAmericas,
	faPalette,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import DefaultFiles from '../../engine/utils/project-hierarchy/default-files';
import File from '../../engine/utils/project-hierarchy/file';

export const getFileActionItems = (cwd: File, file: File) => [
	{
		id: 'remove-file',
		name: 'Remove',
		icon: faTrash,
		onClick() {
			cwd.removeChild(file);
		},
		hasSeparator: true,
	},
];

export const getCreateFileItems = (cwd: File) => [
	{
		id: 'create-file',
		name: 'Create File',
		icon: faFile,
		children: [
			{
				id: 'create-script',
				name: 'Script',
				icon: faFileCode,
				onClick() {
					cwd.addChild(DefaultFiles.createScript('New Script'));
				},
			},
			{
				id: 'create-scene',
				name: 'Scene',
				icon: faGlobeAmericas,
				onClick() {
					cwd.addChild(DefaultFiles.createScene('New Scene'));
				},
			},
			{
				id: 'create-shader',
				name: 'Shader',
				icon: faPalette,
				onClick() {
					cwd.addChild(DefaultFiles.createShader('New Shader'));
				},
			},
			{
				id: 'create-folder',
				name: 'Folder',
				icon: faFolder,
				onClick() {
					cwd.addChild(DefaultFiles.createFolder('New Folder'));
				},
			},
		],
	},
];
