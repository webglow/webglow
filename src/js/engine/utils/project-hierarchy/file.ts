import { v4 as uuidv4 } from 'uuid';
import EngineGlobals from '../../globals';
import { FileType, IFileJSON } from './types';

export default class File {
	id: string;
	type: FileType;
	extension: string;
	name: string;
	parent: File;
	children?: File[];
	content: string;

	constructor(
		name: string,
		type: FileType,
		content: string,
		children?: File[],
		id: string = uuidv4()
	) {
		this.id = id;
		this.name = name;
		this.type = type;
		this.content = content;
		this.children = children;
		this.extension = this.getExtension(type);

		if (type === FileType.Model) {
			EngineGlobals.geometryPool.geometryFromFile(this);
		}
	}

	toJSON(): IFileJSON {
		return {
			id: this.id,
			name: this.name,
			type: this.type,
			content: this.content,
			children: this.children?.map((file: File) => file.toJSON()),
		};
	}

	static fromJSON({ id, name, type, content, children }: IFileJSON) {
		const file = new File(name, type, content, [], id);

		children?.forEach((child: IFileJSON) => {
			const childFile = File.fromJSON(child);

			file.children.push(childFile);

			childFile.parent = file;
		});

		return file;
	}

	addChild(file: File) {
		if (this.type !== FileType.Folder) {
			return;
		}

		this.children.push(file);

		file.parent = this;
	}

	removeChild(file: File) {
		if (this.type !== FileType.Folder) {
			return;
		}

		this.children.splice(this.children.indexOf(file), 1);

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
