import Scene from '../../standard/scene';
import Script from '../script';
import Shader from '../shader';
import File from './file';
import { FileType } from './types';

export default class DefaultFiles {
	static createScript(name: string) {
		const script = new Script(name);

		const file = new File(name, FileType.Script, JSON.stringify(script));

		return file;
	}

	static createShader(name: string) {
		const shader = Shader.default().toJSON();

		const file = new File(name, FileType.Shader, JSON.stringify(shader));

		return file;
	}

	static createFolder(name: string) {
		const file = new File(name, FileType.Folder, null, []);

		return file;
	}

	static createScene(name: string) {
		const scene = new Scene().toJSON();

		const file = new File(name, FileType.Scene, JSON.stringify(scene));

		return file;
	}
}
