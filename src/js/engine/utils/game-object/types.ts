import { ILightJSON } from 'engine/standard/light/types';
import Transform from 'engine/standard/transform';
import { ITransformJSON } from 'engine/standard/transform/types';
import { IScriptJSON } from 'engine/utils/script/types';
import { IMeshJSON } from '../../standard/mesh/types';
import { IMaterialJSON } from '../material/types';

export interface IGameObjectParams {
	TransformType?: typeof Transform;
	isRoot?: boolean;
	displayName?: string;
}

export interface IGameObjectJSON {
	transform: ITransformJSON;
	scripts: IScriptJSON[];
	displayName: string;
	isRoot?: boolean;
	mesh?: IMeshJSON;
	material?: IMaterialJSON;
	light?: ILightJSON;
	camera?: any;
	id: string;
	children: IGameObjectJSON[];
}
