export enum FileType {
	Folder,
	Script,
	Scene,
	Shader,
	Material,
	Model,
}

export interface IFileJSON {
	id: string;
	name: string;
	type: FileType;
	content: string;
	children?: IFileJSON[];
}

export interface IProjectJSON {
	root: IFileJSON;
}
