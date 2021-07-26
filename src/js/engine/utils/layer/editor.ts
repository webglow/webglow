import EditorCameraMovement from 'engine/standard/editor-camera-movement';
import GameObject from 'engine/utils/game-object';
import { ILayer } from 'engine/utils/layer';
import { vec3 } from 'gl-matrix';
import Renderer from '../renderer';

export default class EditorLayer implements ILayer {
	renderer: Renderer;
	editorCamera: GameObject;

	constructor() {
		this.setCamera();
	}

	setCamera() {
		this.editorCamera = new GameObject();
		this.editorCamera.transform.position = vec3.fromValues(0, 10, 10);
		this.editorCamera.transform.rotation = [-45, 0, 0];
		this.editorCamera.addBehaviour(EditorCameraMovement);
		this.editorCamera.addCamera();
		this.editorCamera.behaviour[0].start();
	}

	draw() {
		this.renderer.render(
			this.editorCamera.camera.mProjection,
			this.editorCamera.transform._position,
			this.editorCamera.transform.viewMatrix
		);
	}

	run() {
		this.editorCamera.behaviour[0].update();
	}
}
