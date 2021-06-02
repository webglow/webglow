import Transform from 'engine/standard/transform';

export interface IGameObjectParams {
	TransformType?: typeof Transform;
	isRoot?: boolean;
}
