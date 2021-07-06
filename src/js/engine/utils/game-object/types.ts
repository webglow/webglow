import { ILightJSON } from 'engine/standard/light/types';
import { IMeshTypesJSON } from 'engine/standard/mesh/types';
import Transform from 'engine/standard/transform';
import { ITransformJSON } from 'engine/standard/transform/types';
import { IScriptJSON } from 'engine/utils/script/types';

export interface IGameObjectParams {
	TransformType?: typeof Transform;
	isRoot?: boolean;
}

export interface IGameObjectJSON {
	transform: ITransformJSON;
	scripts: IScriptJSON[];
	isRoot?: boolean;
	mesh?: IMeshTypesJSON;
	material?: any;
	light?: ILightJSON;
	camera?: any;
	id: string;
	children: IGameObjectJSON[];
}
