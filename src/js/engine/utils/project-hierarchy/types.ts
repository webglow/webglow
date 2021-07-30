import { ISceneJSON } from 'engine/standard/scene/types';
import Material from 'engine/utils/material';
import File from 'engine/utils/project-hierarchy/file';
import Script from 'engine/utils/script';
import { IShader } from 'engine/utils/shader/types';
import Model from '../model';

export enum FileType {
	Folder,
	Script,
	Scene,
	Shader,
	Material,
	Model,
}

export type FileContent =
	| Script
	| Material
	| IShader
	| File[]
	| ISceneJSON
	| Model;

export interface IFileJSON {
	name: string;
	type: FileType;
	content: FileContent;
}

export interface IProjectJSON {
	root: IFileJSON;
}
