import { mat4, vec3 } from 'gl-matrix';
import cloneDeep from 'lodash/cloneDeep';
import Camera from '../camera';
import CameraMovement from '../camera-movement';
import Hierarchy from '../../../utils/hierarchy';
import PROJECTION_TYPE from './projection-type';
import Color from '../../../utils/color';
import GameObject from '../../../utils/game-object';
import { LightType } from '../light/types';

export default class Scene {
	gl: WebGL2RenderingContext;
	hierarchy: Hierarchy;
	runtimeHierarchy: Hierarchy;
	sceneCamera: Camera;
	sceneCameraMovement: CameraMovement;
	projectionType: number;
	backgroundColor: Color;
	mProjection: mat4;
	canvas: HTMLCanvasElement;
	isRunning: boolean;

	constructor(
		gl: WebGL2RenderingContext,
		{
			cameraSpeed = 0.5,
			cameraPosition = [0, 0, 0],
			projectionType = PROJECTION_TYPE.PERSPECTIVE,
			backgroundColor = new Color('#000000'),
		} = {}
	) {
		this.gl = gl;
		this.canvas = this.gl.canvas as HTMLCanvasElement;
		this.hierarchy = new Hierarchy('root');

		this.sceneCamera = new Camera(this.gl, cameraSpeed, cameraPosition);
		this.sceneCameraMovement = new CameraMovement(this.sceneCamera, this.gl);

		this.projectionType = projectionType;

		this.backgroundColor = backgroundColor;
		this.gl.clearColor(...this.backgroundColor.toNormalizedVec3(), 1.0);

		this.setProjectionMatrix();

		this.setupEventListeners();

		this.isRunning = false;
	}

	setProjectionMatrix() {
		this.mProjection = mat4.create();
		switch (this.projectionType) {
			case PROJECTION_TYPE.ORTHOGRAPHIC:
				mat4.ortho(
					this.mProjection,
					-this.canvas.clientWidth / 2,
					this.canvas.clientWidth / 2,
					-this.canvas.clientHeight / 2,
					this.canvas.clientHeight / 2,
					-10000,
					10000
				);
				break;
			default:
				mat4.perspective(
					this.mProjection,
					this.sceneCamera.fieldOfView,
					this.canvas.clientWidth / this.canvas.clientHeight,
					1,
					undefined
				);
				break;
		}
	}

	setupEventListeners() {
		document.addEventListener('keydown', (event) => {
			this.sceneCameraMovement.onKeyDown(event.code);
		});

		document.addEventListener('keyup', (event) => {
			this.sceneCameraMovement.onKeyUp(event.code);
		});

		this.gl.canvas.addEventListener('mousedown', () => {
			this.canvas.requestPointerLock();
			this.sceneCameraMovement.setIsLocked(true);
		});

		document.addEventListener('mousemove', (event: MouseEvent) => {
			this.sceneCameraMovement.rotateCamera(event.movementX, event.movementY);
		});

		this.gl.canvas.addEventListener('mouseup', () => {
			document.exitPointerLock();
			this.sceneCameraMovement.setIsLocked(false);
		});

		this.gl.canvas.addEventListener('wheel', (event: WheelEvent) => {
			this.sceneCamera.zoom(-Math.sign(event.deltaY));
			this.setProjectionMatrix();
		});
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

	createDepthTexture() {
		const depthTexture = this.gl.createTexture();
		const depthTextureSize = 512;
		this.gl.bindTexture(this.gl.TEXTURE_2D, depthTexture);
		this.gl.texImage2D(
			this.gl.TEXTURE_2D,
			0,
			this.gl.DEPTH_COMPONENT32F,
			depthTextureSize,
			depthTextureSize,
			0,
			this.gl.DEPTH_COMPONENT,
			this.gl.FLOAT,
			null
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MAG_FILTER,
			this.gl.NEAREST
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MIN_FILTER,
			this.gl.NEAREST
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_S,
			this.gl.CLAMP_TO_EDGE
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_T,
			this.gl.CLAMP_TO_EDGE
		);

		const depthFramebuffer = this.gl.createFramebuffer();
		this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, depthFramebuffer);
		this.gl.framebufferTexture2D(
			this.gl.FRAMEBUFFER,
			this.gl.DEPTH_ATTACHMENT,
			this.gl.TEXTURE_2D,
			depthTexture,
			0
		);
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

	draw(viewWorldPosition?: vec3, pov?: mat4) {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this.sceneCamera.update();

		if (this.isRunning) {
			this.runtimeHierarchy.forEachDrawableNode((gameObject: GameObject) => {
				gameObject.draw(this.mProjection, viewWorldPosition, pov);
			});

			this.run();
		} else {
			this.hierarchy.forEachDrawableNode((gameObject: GameObject) => {
				gameObject.draw(this.mProjection, viewWorldPosition, pov);
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
