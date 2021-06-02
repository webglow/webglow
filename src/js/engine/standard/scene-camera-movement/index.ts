import EngineGlobals from 'engine/globals';
import { Space } from 'engine/utils/enums';
import Behaviour from 'engine/utils/script/behaviour';
import { vec2, vec3 } from 'gl-matrix';

export default class SceneCameraMovement extends Behaviour {
	movementKeys: string[];
	movementKeysDirections: { [key: string]: [number, number, number] };
	movementKeysPressed: Set<string>;
	previousMousePosition: vec2;
	isLocked: boolean;
	isMoving: boolean;
	direction: vec3;
	speed: number;

	start() {
		this.movementKeys = ['KeyW', 'KeyS', 'KeyA', 'KeyD'];
		this.movementKeysDirections = {
			KeyW: [0, 0, -1],
			KeyS: [0, 0, 1],
			KeyA: [-1, 0, 0],
			KeyD: [1, 0, 0],
		};
		this.movementKeysPressed = new Set();
		this.previousMousePosition = vec2.create();
		this.isLocked = false;
		this.direction = vec3.create();
		this.speed = 1;
		this.setupEventListeners();
	}

	setupEventListeners() {
		document.addEventListener('keydown', (event) => {
			this.onKeyDown(event.code);
		});
		document.addEventListener('keyup', (event) => {
			this.onKeyUp(event.code);
		});
		EngineGlobals.canvas.addEventListener('mousedown', () => {
			EngineGlobals.canvas.requestPointerLock();
			this.setIsLocked(true);
		});
		document.addEventListener('mousemove', (event: MouseEvent) => {
			this.rotateCamera(event.movementX, event.movementY);
		});
		EngineGlobals.canvas.addEventListener('mouseup', () => {
			document.exitPointerLock();
			this.setIsLocked(false);
		});
	}

	update() {
		if (this.isMoving) {
			const direction = vec3.transformQuat(
				vec3.create(),
				vec3.scale(vec3.create(), this.direction, this.speed),
				this.gameObject.transform.quatRotation
			);
			this.gameObject.transform.translate(direction);
		}
	}

	onKeyDown(eventKey: string) {
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

			this.setMoving(direction);
		}
	}

	onKeyUp(eventKey: string) {
		if (this.movementKeys.includes(eventKey)) {
			this.movementKeysPressed.delete(eventKey);

			if (!this.movementKeysPressed.size) {
				this.stop();
			} else {
				const direction = Array.from(this.movementKeysPressed).reduce(
					(acc, value) =>
						vec3.add(acc, acc, this.movementKeysDirections[value]),
					vec3.create()
				);

				this.setMoving(direction);
			}
		}
	}

	setMoving(direction: vec3) {
		this.direction = direction;
		this.isMoving = true;
	}

	stop() {
		this.direction = vec3.create();
		this.isMoving = false;
	}

	setIsLocked(isLocked: boolean) {
		this.isLocked = isLocked;
	}

	rotateCamera(deltaX: number, deltaY: number) {
		if (!this.isLocked) {
			return;
		}

		this.gameObject.transform.rotate([Math.sign(-deltaY), 0, 0]);
		this.gameObject.transform.rotate([0, Math.sign(-deltaX), 0], Space.World);
	}
}
