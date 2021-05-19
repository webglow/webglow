import { vec2, vec3 } from 'gl-matrix';
import { Space } from '../../../utils/enums';

export default class CameraMovement {
	constructor(camera, gl) {
		this.movementKeys = ['KeyW', 'KeyS', 'KeyA', 'KeyD'];
		this.gl = gl;
		this.movementKeysDirections = {
			KeyW: [0, 0, -1],
			KeyS: [0, 0, 1],
			KeyA: [-1, 0, 0],
			KeyD: [1, 0, 0],
		};
		this.movementKeysPressed = new Set();
		this.camera = camera;
		this.previousMousePosition = vec2.create();
		this.isLocked = false;
	}

	onKeyDown(eventKey) {
		if (
			this.isLocked &&
			this.movementKeys.includes(eventKey) &&
			!this.movementKeysPressed.has(eventKey)
		) {
			this.movementKeysPressed.add(eventKey);

			const direction = Array.from(this.movementKeysPressed).reduce(
				(acc, value) => vec3.add(acc, acc, this.movementKeysDirections[value]),
				vec3.create()
			);

			this.camera.setMoving(direction);
		}
	}

	onKeyUp(eventKey) {
		if (this.movementKeys.includes(eventKey)) {
			this.movementKeysPressed.delete(eventKey);

			if (!this.movementKeysPressed.size) {
				this.camera.stop();
			} else {
				const direction = Array.from(this.movementKeysPressed).reduce(
					(acc, value) =>
						vec3.add(acc, acc, this.movementKeysDirections[value]),
					vec3.create()
				);

				this.camera.setMoving(direction);
			}
		}
	}

	setIsLocked(isLocked) {
		this.isLocked = isLocked;
	}

	rotateCamera(deltaX, deltaY) {
		if (!this.isLocked) {
			return;
		}

		const deltaAngle =
			3 *
			Math.asin(
				vec2.length(vec2.fromValues(deltaX, deltaY)) /
					vec2.length(
						vec2.fromValues(
							this.gl.canvas.clientWidth,
							this.gl.canvas.clientHeight
						)
					)
			);

		this.camera.transform.rotate(deltaAngle, [-deltaY, 0, 0]);
		this.camera.transform.rotate(deltaAngle, [0, -deltaX, 0], Space.World);
	}
}
