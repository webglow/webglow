import Material from '../material';
import Script from '../script';
import { Shader } from '../shader/types';
import File from './file';

export enum FileType {
	Folder,
	Script,
	Shader,
	Material,
}

export type FileContent = Script | Material | Shader | File[];
