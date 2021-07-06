import Scene from 'engine/standard/scene';
import GameObject from 'engine/utils/game-object';
import { ILayer } from 'engine/utils/layer';

export default class RuntimeLayer implements ILayer {
	scene: Scene;
	mainCamera: GameObject;

	setCamera() {
		// find a camera on an object
		alert('No active camera!');
	}

	start() {
		this.scene.hierarchy.forEachScriptedNode((gameObject) => {
			gameObject.scripts.forEach((script) => {
				script.behaviour.start();
			});
		});
	}

	draw() {
		if (!this.mainCamera) {
			return;
		}

		this.scene.draw(
			this.mainCamera.camera.mProjection,
			this.mainCamera.transform.position,
			this.mainCamera.transform.viewMatrix
		);
	}

	run() {
		this.scene.runPhysics();
		this.scene.runScripts();
	}
}
