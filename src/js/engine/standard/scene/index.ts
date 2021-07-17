import { ISceneJSON } from 'engine/standard/scene/types';
import SceneHierarchy from 'engine/utils/scene-hierarchy';

export default class Scene {
	hierarchy: SceneHierarchy;

	constructor(hierarchy = new SceneHierarchy('root')) {
		this.hierarchy = hierarchy;
	}

	toJSON(): ISceneJSON {
		return {
			hierarchy: this.hierarchy.toJSON(),
		};
	}

	static fromJSON({ hierarchy }: ISceneJSON): Scene {
		return new Scene(SceneHierarchy.fromJSON(hierarchy));
	}
}
