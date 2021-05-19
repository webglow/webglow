import Script from '../script';
import defaultShader from '../shader';
import File from './file';
import { FileType } from './types';

export default class ProjectHierarchy {
	root: File;

	constructor() {
		this.root = new File('/', FileType.Folder, []);
	}
}

export function getTestHierarchy() {
	const hierarchy = new ProjectHierarchy();
	const folder = new File('Assets', FileType.Folder, []);

	hierarchy.root.addChild(
		new File('my-script', FileType.Script, new Script('my-script'))
	);
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
