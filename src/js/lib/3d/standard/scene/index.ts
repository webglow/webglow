import { mat4, vec3 } from 'gl-matrix';
import Camera from '../camera';
import CameraMovement from '../camera-movement';
import Hierarchy from '../../../utils/hierarchy';
import DirectionalLight from '../light/directional';
import PointLight from '../light/point';
import PROJECTION_TYPE from './projection-type';
import Color from '../../../utils/color';
import HierarchyNode from '../../../utils/hierarchy/node';

export default class Scene {
	gl: WebGL2RenderingContext;
	hierarchy: Hierarchy;
	sceneCamera: Camera;
	sceneCameraMovement: CameraMovement;
	projectionType: number;
	backgroundColor: Color;
	mProjection: mat4;
	canvas: HTMLCanvasElement;

	constructor(
		gl: WebGL2RenderingContext,
		{
			cameraSpeed = 50,
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
			this.sceneCameraMovement.setIsRotating(true);
		});

		document.addEventListener('mousemove', (event: MouseEvent) => {
			this.sceneCameraMovement.rotateCamera(event.movementX, event.movementY);
		});

		this.gl.canvas.addEventListener('mouseup', () => {
			document.exitPointerLock();
			this.sceneCameraMovement.setIsRotating(false);
		});

		this.gl.canvas.addEventListener('wheel', (event: WheelEvent) => {
			this.sceneCamera.zoom(-Math.sign(event.deltaY));
			this.setProjectionMatrix();
		});
	}

	setupLight() {
		this.hierarchy.forEachDrawableNode((node: HierarchyNode) => {
			node.gameObject.mesh.setupDirectionalLight(
				this.hierarchy.nodesArray
					.filter(
						(n) =>
							n.gameObject && n.gameObject.light instanceof DirectionalLight
					)
					.map((lightNode) => lightNode.gameObject.light)
			);
			node.gameObject.mesh.setupPointLight(
				this.hierarchy.nodesArray
					.filter(
						(n) => n.gameObject && n.gameObject.light instanceof PointLight
					)
					.map((lightNode) => lightNode.gameObject.light)
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

	draw(viewWorldPosition?: vec3, pov?: mat4) {
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		this.sceneCamera.update();

		this.hierarchy.forEachDrawableNode((node: HierarchyNode) => {
			node.gameObject.mesh.draw(this.mProjection, viewWorldPosition, pov);
		});
		// this.hierarchy.forEachPhysicsNode((node: HierarchyNode) => {
			// node.gameObject.rigidBody.move();
		// });
	}
}
