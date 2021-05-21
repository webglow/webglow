import Transform from '../../3d/standard/transform';

export interface IGameObjectParams {
	TransformType?: typeof Transform;
	isRoot?: boolean;
}
