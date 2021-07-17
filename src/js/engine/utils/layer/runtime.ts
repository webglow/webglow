import GameObject from 'engine/utils/game-object';
import { ILayer } from 'engine/utils/layer';
import Renderer from '../renderer';

export default class RuntimeLayer implements ILayer {
	renderer: Renderer;
	mainCamera: GameObject;

	setCamera() {
		// find a camera on an object
		alert('No active camera!');
	}

	start() {
		this.renderer.runScriptsStart();
	}

	draw() {
		if (!this.mainCamera) {
			return;
		}

		this.renderer.render(
			this.mainCamera.camera.mProjection,
			this.mainCamera.transform.position,
			this.mainCamera.transform.viewMatrix
		);
	}

	run() {
		this.renderer.runPhysics();
		this.renderer.runScripts();
	}
}
