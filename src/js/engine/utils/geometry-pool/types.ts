import Geometry from '../../standard/geometry';

export interface PoolItem {
	geometry: Geometry;
	id: string;
	fileId?: string;
}
