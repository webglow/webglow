import Transform from '../../3d/standard/transform';

export interface GameObjectParams {
	gl?: WebGL2RenderingContext;
	TransformType?: typeof Transform;
	isRoot?: boolean;
}
