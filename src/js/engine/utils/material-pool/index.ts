import { runInAction } from 'mobx';
import Material from '../material';
import File from '../project-hierarchy/file';
import { FileType } from '../project-hierarchy/types';
import { IPoolItem } from './types';

export default class MaterialPool {
	pool: IPoolItem[] = [
		{
			id: 'default',
			material: Material.default(),
		},
	];

	materialFromFile(file: File) {
		if (file.type !== FileType.Material) {
			return;
		}

		const material = Material.fromJSON(JSON.parse(file.content));

		this.pool.push({
			id: material.id,
			material,
			file,
		});
	}

	updateFile(material: Material) {
		const poolItem = this.getItemById(material.id);

		if (!poolItem || !poolItem.file) {
			return;
		}

		runInAction(() => {
			poolItem.file.content = JSON.stringify(material.toJSON());
		});
	}

	renameMaterial(fileId: string, newName: string) {
		const material = this.getMaterialByFileId(fileId);

		material.displayName = newName;
	}

	getItemById(id: string) {
		return this.pool.find((item) => item.id === id);
	}

	getMaterialById(id: string) {
		return this.pool.find((item) => item.id === id)?.material;
	}

	getMaterialByFileId(fileId: string) {
		return this.pool.find((item) => item.file?.id === fileId)?.material;
	}
}
