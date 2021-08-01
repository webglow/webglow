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

		this.registerPoolItem();
	}

	registerPoolItem() {
		switch (this.type) {
			case FileType.Model:
				EngineGlobals.geometryPool.geometryFromFile(this);
				return;
			case FileType.Material:
				EngineGlobals.materialPool.materialFromFile(this);
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

		const { fileName } = file.name.match(
			/^(?<fileName>.*?)(\((?<number>\d+)\))?$/
		).groups;

		const fileNameRegex = new RegExp(
			`^${fileName}\\s*(\\((?<number>\\d+)\\))?$`
		);
		const numbers = this.children
			.filter((f) => fileNameRegex.test(f.name))
			.map((f) => parseInt(f.name.match(fileNameRegex).groups?.number));

		if (numbers) {
			const max = Math.max(...numbers.filter((n) => !isNaN(n)));
			if (max > -Infinity) {
				file.rename(`${fileName} (${max + 1})`);
			} else {
				file.rename(`${fileName} (1)`);
			}
		}

		this.children.push(file);

		file.parent = this;
	}

	rename(newName: string) {
		this.name = newName;

		switch (this.type) {
			case FileType.Material:
				this.content = JSON.stringify({
					...JSON.parse(this.content),
					displayName: newName,
				});
				EngineGlobals.materialPool.renameMaterial(this.id, newName);
				break;
		}
	}

	remove() {
		if (this.parent) {
			this.parent.children.splice(this.parent.children.indexOf(this), 1);
			this.parent = null;
		}

		if (this.type === FileType.Model) {
			EngineGlobals.geometryPool.removeByFileId(this.id);
		}
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
				return '.mtl';
			default:
				return '';
		}
	}
}
