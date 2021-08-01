import Geometry from '../../standard/geometry';

export interface IPoolItem {
	geometry: Geometry;
	id: string;
	fileId?: string;
}
