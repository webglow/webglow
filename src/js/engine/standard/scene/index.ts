import { LightType } from 'engine/standard/light/types';
import { ISceneJSON } from 'engine/standard/scene/types';
import GameObject from 'engine/utils/game-object';
import SceneHierarchy from 'engine/utils/scene-hierarchy';
import { mat4, vec3 } from 'gl-matrix';

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

	// Shouldn't be here
	setupLight() {
		this.hierarchy.forEachMaterialNode((gameObject: GameObject) => {
			gameObject.material.setLights(
				LightType.Directional,
				this.hierarchy.nodesArray
					.filter((go) => go.light && go.light.type === LightType.Directional)
					.map((lightObject) => lightObject.light)
			);
			gameObject.material.setLights(
				LightType.Point,
				this.hierarchy.nodesArray
					.filter((go) => go.light && go.light.type === LightType.Point)
					.map((lightObject) => lightObject.light)
			);
		});
	}

	draw(mProjection: mat4, viewWorldPosition: vec3, viewMatrix: mat4) {
		this.hierarchy.forEachDrawableNode((gameObject: GameObject) => {
			gameObject.draw(mProjection, viewWorldPosition, viewMatrix);
		});
	}

	runPhysics() {
		this.hierarchy.forEachPhysicsNode((gameObject: GameObject) => {
			gameObject.rigidBody.move();
		});
	}

	runScripts() {
		this.hierarchy.forEachScriptedNode((gameObject) => {
			gameObject.scripts.forEach((script) => {
				script.behaviour.update();
			});
		});
	}
}
