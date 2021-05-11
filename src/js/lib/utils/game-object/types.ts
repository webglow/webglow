import Transform2D from '../../2d/standard/transform';
import Scene from '../../3d/standard/scene';
import Transform from '../../3d/standard/transform';

export interface GameObjectParams {
	gl: WebGL2RenderingContext;
	scene: Scene;
	TransformType?: typeof Transform;
}
