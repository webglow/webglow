import { vec2, vec3 } from 'gl-matrix';

export default class CameraMovement {
	constructor(camera, gl) {
		this.movementKeys = ['w', 's', 'a', 'd'];
		this.gl = gl;
		this.movementKeysDirections = {
			w: [0, 0, -1],
			s: [0, 0, 1],
			a: [-1, 0, 0],
			d: [1, 0, 0],
		};
		this.movementKeysPressed = new Set();
		this.camera = camera;
		this.previousMousePosition = vec2.create();
		this.isRotating = false;
	}

	onKeyDown(eventKey) {
		if (
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

	setIsRotating(isRotating) {
		this.isRotating = isRotating;
	}

	rotateCamera(deltaX, deltaY) {
		if (!this.isRotating) {
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

		this.camera.rotate(deltaAngle, [-deltaY, -deltaX, 0]);
	}
}
