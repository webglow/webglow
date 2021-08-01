import Material from '../material';
import File from '../project-hierarchy/file';

export interface IPoolItem {
	id: string;
	file?: File;
	material: Material;
}
