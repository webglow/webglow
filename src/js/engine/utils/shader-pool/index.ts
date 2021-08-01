import Shader from '../shader';
import { IPoolItem } from './types';

export default class ShaderPool {
	pool: IPoolItem[] = [
		{
			id: 'default',
			shader: Shader.default(),
		},
	];

	get(id: string) {
		return this.pool.find((item) => item.id === id).shader;
	}
}
