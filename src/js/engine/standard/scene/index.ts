import EngineGlobals from 'engine/globals';
import { LightType } from 'engine/standard/light/types';
import SceneCameraMovement from 'engine/standard/scene-camera-movement';
import Color from 'engine/utils/color';
import GameObject from 'engine/utils/game-object';
import SceneHierarchy from 'engine/utils/scene-hierarchy';
import cloneDeep from 'lodash/cloneDeep';

export default class Scene {
	hierarchy: SceneHierarchy;
	runtimeHierarchy: SceneHierarchy;
	sceneCamera: GameObject;
	projectionType: number;
	canvas: HTMLCanvasElement;
	backgroundColor: Color;
	isRunning: boolean;

	constructor({ backgroundColor = new Color('#000000') } = {}) {
		this.hierarchy = new SceneHierarchy('root');

		this.setSceneCamera();

		(window as any).hierarchy = this.hierarchy;

		this.backgroundColor = backgroundColor;
		EngineGlobals.gl.clearColor(
			...this.backgroundColor.toNormalizedVec3(),
			1.0
		);

		this.isRunning = false;
	}

	setSceneCamera() {
		this.sceneCamera = new GameObject();
		this.sceneCamera.addBehaviour(SceneCameraMovement);
		this.sceneCamera.addCamera();
		this.sceneCamera.behaviour[0].start();
	}

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

	toggleRunning() {
		if (!this.isRunning) {
			this.runtimeHierarchy = cloneDeep(this.hierarchy);
			this.runtimeHierarchy.forEachScriptedNode((gameObject) => {
				gameObject.scripts.forEach((script) => {
					script.behaviour.start();
				});
			});
		} else {
			this.runtimeHierarchy = null;
		}

		this.isRunning = !this.isRunning;
	}

	draw() {
		EngineGlobals.gl.clear(
			EngineGlobals.gl.COLOR_BUFFER_BIT | EngineGlobals.gl.DEPTH_BUFFER_BIT
		);

		if (this.isRunning) {
			this.runtimeHierarchy.forEachDrawableNode((gameObject: GameObject) => {
				gameObject.draw(
					this.sceneCamera.camera.mProjection,
					this.sceneCamera.transform.position,
					this.sceneCamera.transform.viewMatrix
				);
			});

			this.run();
		} else {
			this.sceneCamera.behaviour[0].update();

			this.hierarchy.forEachDrawableNode((gameObject: GameObject) => {
				gameObject.draw(
					this.sceneCamera.camera.mProjection,
					this.sceneCamera.transform.position,
					this.sceneCamera.transform.viewMatrix
				);
			});
		}
	}

	run() {
		this.runtimeHierarchy.forEachPhysicsNode((gameObject: GameObject) => {
			gameObject.rigidBody.move();
		});

		this.runtimeHierarchy.forEachScriptedNode((gameObject) => {
			gameObject.scripts.forEach((script) => {
				script.behaviour.update();
			});
		});
	}
}
