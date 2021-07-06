import EditorCameraMovement from 'engine/standard/editor-camera-movement';
import Scene from 'engine/standard/scene';
import GameObject from 'engine/utils/game-object';
import { ILayer } from 'engine/utils/layer';

export default class EditorLayer implements ILayer {
	scene: Scene;
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
		this.scene.draw(
			this.editorCamera.camera.mProjection,
			this.editorCamera.transform.position,
			this.editorCamera.transform.viewMatrix
		);
	}

	run() {
		this.editorCamera.behaviour[0].update();
	}
}
