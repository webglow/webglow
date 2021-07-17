import EditorCameraMovement from 'engine/standard/editor-camera-movement';
import GameObject from 'engine/utils/game-object';
import { ILayer } from 'engine/utils/layer';
import Renderer from '../renderer';

export default class EditorLayer implements ILayer {
	renderer: Renderer;
	editorCamera: GameObject;

	constructor() {
		this.setCamera();
	}

	setCamera() {
		this.editorCamera = new GameObject();
		this.editorCamera.addBehaviour(EditorCameraMovement);
		this.editorCamera.addCamera();
		this.editorCamera.behaviour[0].start();
	}

	draw() {
		this.renderer.render(
			this.editorCamera.camera.mProjection,
			this.editorCamera.transform.position,
			this.editorCamera.transform.viewMatrix
		);
	}

	run() {
		this.editorCamera.behaviour[0].update();
	}
}
