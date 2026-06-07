import File from 'engine/utils/project-hierarchy/file';
import Shader from 'engine/utils/shader';
import Tetris from '../../../scenes/tetris/scene';
import { getDefaultScriptText } from '../script/helpers';
import { FileType, IProjectJSON } from './types';

export default class ProjectHierarchy {
	root: File;

	constructor() {
		this.root = new File('/', FileType.Folder, null, []);
	}

	toJSON(): IProjectJSON {
		return {
			root: this.root.toJSON(),
		};
	}

	static fromJSON(project: IProjectJSON) {
		const root = File.fromJSON(project.root);

		const hierarchy = new ProjectHierarchy();
		hierarchy.root = root;

		return hierarchy;
	}

	getFileById(id: string) {
		const stack = [this.root];

		while (stack.length) {
			const file = stack.pop();

			if (file.id === id) {
				return file;
			}

			for (const child of file.children) {
				if (child.id === id) {
					return child;
				}

				if (child.type === FileType.Folder) {
					stack.push(child);
				}
			}
		}
	}
}

export function getTestHierarchy() {
	const hierarchy = new ProjectHierarchy();
	const folder = new File('Assets', FileType.Folder, null, []);

	hierarchy.root.addChild(
		new File('My Script', FileType.Script, getDefaultScriptText('MyScript'))
	);
	hierarchy.root.addChild(
		new File(
			'main-scene',
			FileType.Scene,
			JSON.stringify(new Tetris().toJSON())
		)
	);
	hierarchy.root.addChild(
		new File(
			'default-shader',
			FileType.Shader,
			JSON.stringify(Shader.default().toJSON())
		)
	);
	hierarchy.root.addChild(folder);

	folder.addChild(
		new File(
			'Another Script',
			FileType.Script,
			getDefaultScriptText('AnotherScript')
		)
	);

	folder.addChild(
		new File(
			'another-shader',
			FileType.Shader,
			JSON.stringify(Shader.default().toJSON())
		)
	);

	return hierarchy;
}
