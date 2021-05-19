import Material from '../material';
import Script from '../script';
import { IShader } from '../shader/types';
import File from './file';

export enum FileType {
	Folder,
	Script,
	Shader,
	Material,
}

export type FileContent = Script | Material | IShader | File[];
