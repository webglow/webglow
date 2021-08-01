import Shader from '../shader';

export interface IPoolItem {
	id: string;
	file?: File;
	shader: Shader;
}
