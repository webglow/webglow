import Scene from '../../standard/scene';
import Script from '../script';
import getDefaultShader from '../shader';
import File from './file';
import { FileType } from './types';

export default class DefaultFiles {
	static createScript(name: string) {
		const script = new Script(name);

		const file = new File(name, FileType.Script, script);

		return file;
	}

	static createShader(name: string) {
		const shader = getDefaultShader();

		const file = new File(name, FileType.Shader, shader);

		return file;
	}

	static createFolder(name: string) {
		const file = new File(name, FileType.Folder, []);

		return file;
	}

	static createScene(name: string) {
		const scene = new Scene().toJSON();

		const file = new File(name, FileType.Scene, scene);

		return file;
	}
}
