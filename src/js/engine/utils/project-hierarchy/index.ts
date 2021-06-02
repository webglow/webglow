import File from 'engine/utils/project-hierarchy/file';
import Script from 'engine/utils/script';
import defaultShader from 'engine/utils/shader';
import Tetris from '../../../scenes/tetris/scene';
import { FileType } from './types';

export default class ProjectHierarchy {
	root: File;

	constructor() {
		this.root = new File('/', FileType.Folder, []);
	}

	toJSON() {
		return {
			root: this.root,
		};
	}
}

export function getTestHierarchy() {
	const hierarchy = new ProjectHierarchy();
	const folder = new File('Assets', FileType.Folder, []);

	hierarchy.root.addChild(
		new File('my-script', FileType.Script, new Script('my-script'))
	);
	hierarchy.root.addChild(new File('main-scene', FileType.Scene, new Tetris()));
	hierarchy.root.addChild(
		new File('default-shader', FileType.Shader, defaultShader)
	);
	hierarchy.root.addChild(folder);

	folder.addChild(
		new File('another-script', FileType.Script, new Script('another-script'))
	);

	folder.addChild(new File('another-shader', FileType.Shader, defaultShader));

	return hierarchy;
}
