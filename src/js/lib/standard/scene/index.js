import Camera from '../camera';
import CameraMovement from '../camera-movement';
import Hierarchy from '../hierarchy';
import { NODE_TYPE } from '../hierarchy/node';

export default class Scene {
	constructor(gl, { cameraSpeed = 50, cameraPosition = [0, 0, 0] } = {}) {
		this.gl = gl;
		this.hierarchy = new Hierarchy('root');
		this.sceneCamera = new Camera(this.gl, cameraSpeed, cameraPosition);
		this.sceneCameraMovement = new CameraMovement(this.sceneCamera, this.gl);
		this.nextTextureUnit = 0;

		this.setupEventListeners();
	}

	setupEventListeners() {
		document.addEventListener('keydown', (event) => {
			this.sceneCameraMovement.onKeyDown(event.code);
		});

		document.addEventListener('keyup', (event) => {
			this.sceneCameraMovement.onKeyUp(event.code);
		});

		this.gl.canvas.addEventListener('mousedown', () => {
			this.gl.canvas.requestPointerLock();
			this.sceneCameraMovement.setIsRotating(true);
		});

		document.addEventListener('mousemove', (event) => {
			this.sceneCameraMovement.rotateCamera(event.movementX, event.movementY);
		});

		this.gl.canvas.addEventListener('mouseup', () => {
			document.exitPointerLock();
			this.sceneCameraMovement.setIsRotating(false);
		});

		this.gl.canvas.addEventListener('wheel', (event) => {
			this.sceneCamera.zoom(-Math.sign(event.deltaY));
		});
	}

	getFreeTextureUnit() {
		return this.nextTextureUnit++;
	}

	setupLight() {
		this.hierarchy.forEachDrawableNode((node) => {
			node.objectInstance.setupDirectionalLight(
				this.hierarchy
					.getNodesWithType(NODE_TYPE.DIRECTIONAL_LIGHT)
					.map((lightNode) => lightNode.objectInstance)
			);
			node.objectInstance.setupPointLight(
				this.hierarchy
					.getNodesWithType(NODE_TYPE.POINT_LIGHT)
					.map((lightNode) => lightNode.objectInstance)
			);
		});
	}

	draw() {
		this.sceneCamera.update();

		this.hierarchy.forEachDrawableNode((node) => {
			node.objectInstance.draw();
		});
	}
}
