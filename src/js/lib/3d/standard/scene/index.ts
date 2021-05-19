import { mat4, vec3 } from 'gl-matrix';
import cloneDeep from 'lodash/cloneDeep';
import Camera from '../camera';
import SceneCameraMovement from '../scene-camera-movement';
import Hierarchy from '../../../utils/hierarchy';
import Color from '../../../utils/color';
import GameObject from '../../../utils/game-object';
import { LightType } from '../light/types';
import Script from '../../../utils/script';

export default class Scene {
	gl: WebGL2RenderingContext;
	hierarchy: Hierarchy;
	runtimeHierarchy: Hierarchy;
	sceneCamera: GameObject;
	projectionType: number;
	canvas: HTMLCanvasElement;
	backgroundColor: Color;
	isRunning: boolean;

	constructor(
		gl: WebGL2RenderingContext,
		{ backgroundColor = new Color('#000000') } = {}
	) {
		this.gl = gl;
		this.canvas = gl.canvas as HTMLCanvasElement;
		this.hierarchy = new Hierarchy('root');

		this.setSceneCamera();

		this.backgroundColor = backgroundColor;
		this.gl.clearColor(...this.backgroundColor.toNormalizedVec3(), 1.0);

		this.isRunning = false;
	}

	setSceneCamera() {
		this.sceneCamera = new GameObject({ gl: this.gl });
		const cameraMovementScript = new Script(
			'camera-movement',
			new SceneCameraMovement(this.sceneCamera)
		);
		this.sceneCamera.addCamera();
		this.sceneCamera.addScript(cameraMovementScript);
		this.sceneCamera.scripts[0].behaviour.start();
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
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

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
			this.sceneCamera.scripts[0].behaviour.update();

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
