import { mat4, vec3 } from 'gl-matrix';
import { LightType } from '../../standard/light/types';
import Scene from '../../standard/scene';
import GameObject from '../game-object';

export default class Renderer {
	scene: Scene;
	queue: GameObject[] = [];

	constructor(scene: Scene) {
		this.scene = scene;
	}

	updateLight() {
		this.scene.hierarchy.forEachDrawableNode(({ meshRenderer }: GameObject) => {
			const directionalLights = this.scene.hierarchy.nodesArray
				.filter((go) => go.light && go.light.type === LightType.Directional)
				.map((lightObject) => lightObject.light);
			const pointLights = this.scene.hierarchy.nodesArray
				.filter((go) => go.light && go.light.type === LightType.Point)
				.map((lightObject) => lightObject.light);

			meshRenderer.setLights(LightType.Directional, directionalLights);
			meshRenderer.setLights(LightType.Point, pointLights);
		});
	}

	render(mProjection: mat4, viewWorldPosition: vec3, viewMatrix: mat4) {
		// TODO: should be rethought, should be updated only when gameObject with light component or
		// gameObject with mesh is moved
		this.updateLight();

		this.scene.hierarchy.forEachDrawableNode(({ meshRenderer }: GameObject) => {
			meshRenderer.render(mProjection, viewWorldPosition, viewMatrix);
		});
	}

	runPhysics() {
		this.scene.hierarchy.forEachPhysicsNode((gameObject: GameObject) => {
			gameObject.rigidBody.move();
		});
	}

	runScriptsStart() {
		this.scene.hierarchy.forEachScriptedNode((gameObject) => {
			gameObject.scripts.forEach((script) => {
				script.behaviour.start();
			});
		});
	}

	runScripts() {
		this.scene.hierarchy.forEachScriptedNode((gameObject) => {
			gameObject.scripts.forEach((script) => {
				script.behaviour.update();
			});
		});
	}
}
