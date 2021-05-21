import { vec2, vec3 } from 'gl-matrix';
import EngineGlobals from '../../../../globals';
import { Space } from '../../../utils/enums';
import Behaviour from '../../../utils/script/behaviour';

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
			this.gameObject.transform.translate(
				vec3.scale(
					vec3.create(),
					vec3.normalize(
						vec3.create(),
						vec3.transformMat4(
							vec3.create(),
							this.direction,
							this.gameObject.transform.mRotation
						)
					),
					this.speed
				)
			);
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

		const deltaAngle =
			3 *
			Math.asin(
				vec2.length(vec2.fromValues(deltaX, deltaY)) /
					vec2.length(
						vec2.fromValues(
							EngineGlobals.canvas.clientWidth,
							EngineGlobals.canvas.clientHeight
						)
					)
			);

		this.gameObject.transform.rotate(deltaAngle, [-deltaY, 0, 0]);
		this.gameObject.transform.rotate(deltaAngle, [0, -deltaX, 0], Space.World);
	}
}
