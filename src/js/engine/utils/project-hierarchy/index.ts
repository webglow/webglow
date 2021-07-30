import File from 'engine/utils/project-hierarchy/file';
import Script from 'engine/utils/script';
import getDefaultShader from 'engine/utils/shader';
import Tetris from '../../../scenes/tetris/scene';
import Model from '../model';
import { IModelJSON } from '../model/types';
import { FileType, IFileJSON, IProjectJSON } from './types';

export default class ProjectHierarchy {
	root: File;

	constructor() {
		this.root = new File('/', FileType.Folder, []);
	}

	toJSON(): IProjectJSON {
		return {
			root: this.root.toJSON(),
		};
	}

	static fromJSON(project: IProjectJSON) {
		function constructFileTree(fileJson: IFileJSON) {
			let file: File;

			if (fileJson.type === FileType.Folder) {
				file = new File(fileJson.name, fileJson.type, []);

				(fileJson.content as IFileJSON[]).forEach((child: IFileJSON) => {
					const childFile = constructFileTree(child);

					(file.content as File[]).push(childFile);

					childFile.parent = file;
				});
			} else if (fileJson.type === FileType.Model) {
				file = new File(
					fileJson.name,
					fileJson.type,
					new Model(
						(fileJson.content as IModelJSON).obj,
						(fileJson.content as IModelJSON).id
					)
				);
			} else {
				file = new File(fileJson.name, fileJson.type, fileJson.content);
			}

			return file;
		}

		const root = constructFileTree(project.root);

		const hierarchy = new ProjectHierarchy();
		hierarchy.root = root;

		return hierarchy;
	}
}

export function getTestHierarchy() {
	const hierarchy = new ProjectHierarchy();
	const folder = new File('Assets', FileType.Folder, []);

	hierarchy.root.addChild(
		new File('my-script', FileType.Script, new Script('my-script'))
	);
	hierarchy.root.addChild(
		new File('main-scene', FileType.Scene, new Tetris().toJSON())
	);
	hierarchy.root.addChild(
		new File('default-shader', FileType.Shader, getDefaultShader())
	);
	hierarchy.root.addChild(folder);

	folder.addChild(
		new File('another-script', FileType.Script, new Script('another-script'))
	);

	folder.addChild(
		new File('another-shader', FileType.Shader, getDefaultShader())
	);

	return hierarchy;
}
