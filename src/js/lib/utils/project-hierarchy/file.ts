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

	addChild(file: File) {
		if (this.type !== FileType.Folder) {
			return;
		}

		(this.content as File[]).push(file);

		file.parent = this;
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
