import File from 'engine/utils/project-hierarchy/file';
import Script from 'engine/utils/script';
import Shader from 'engine/utils/shader';
import Tetris from '../../../scenes/tetris/scene';
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
}

export function getTestHierarchy() {
	const hierarchy = new ProjectHierarchy();
	const folder = new File('Assets', FileType.Folder, null, []);

	hierarchy.root.addChild(
		new File(
			'my-script',
			FileType.Script,
			JSON.stringify(new Script('my-script').toJSON())
		)
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
			'another-script',
			FileType.Script,
			JSON.stringify(new Script('another-script'))
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
