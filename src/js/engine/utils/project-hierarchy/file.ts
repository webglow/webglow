import { FileType, FileContent } from './types';

export default class File {
	type: FileType;
	extension: string;
	name: string;
	parent: File;
	content: FileContent;

	constructor(name: string, type: FileType, content: FileContent) {
		this.name = name;
		this.type = type;
		this.content = content;
		this.extension = this.getExtension(type);
	}

	toJSON(): any {
		let contentJSON;

		if ('toJSON' in this.content) {
			contentJSON = this.content.toJSON();
		} else if (this.content instanceof Array) {
			contentJSON = this.content.map((file: File) => file.toJSON());
		} else {
			contentJSON = this.content;
		}

		return {
			name: this.name,
			type: this.type,
			content: contentJSON,
		};
	}

	addChild(file: File) {
		if (this.type !== FileType.Folder) {
			return;
		}

		(this.content as File[]).push(file);

		file.parent = this;
	}

	removeChild(file: File) {
		if (this.type !== FileType.Folder) {
			return;
		}

		(this.content as File[]).splice((this.content as File[]).indexOf(file), 1);

		file.parent = null;
	}

	getExtension(type: FileType) {
		switch (type) {
			case FileType.Script:
				return '.js';
			case FileType.Shader:
				return '.shader';
			case FileType.Material:
				return '.mat';
			default:
				return '';
		}
	}
}
