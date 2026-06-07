import EngineGlobals from 'engine/globals';
import { Space } from 'engine/utils/enums';
import Behaviour from 'engine/utils/script/behaviour';
import { vec2, vec3 } from 'gl-matrix';

export default class EditorCameraMovement extends Behaviour {
	movementKeys: string[];
	movementKeysDirections: { [key: string]: [number, number, number] };
	movementKeysPressed: Set<string>;
	previousMousePosition: vec2;
	isLocked: boolean;
	isMoving: boolean;
	direction: vec3;
	speed: number;

	keyDownListener: (event: KeyboardEvent) => void;
	keyUpListener: (event: KeyboardEvent) => void;
	mouseDownListener: (event: MouseEvent) => void;
	mouseMoveListener: (event: MouseEvent) => void;
	mouseUpListener: (event: MouseEvent) => void;

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
		this.speed = 0.1;

		this.keyDownListener = (event: KeyboardEvent) => {
			this.onKeyDown(event.code);
		};
		this.keyUpListener = (event: KeyboardEvent) => {
			this.onKeyUp(event.code);
		};
		this.mouseDownListener = (event: MouseEvent) => {
			EngineGlobals.canvas.requestPointerLock();
			this.setIsLocked(true);
		};
		this.mouseMoveListener = (event: MouseEvent) => {
			this.rotateCamera(event.movementX, event.movementY);
		};
		this.mouseUpListener = (event: MouseEvent) => {
			document.exitPointerLock();
			this.setIsLocked(false);
		};

		this.setupEventListeners();
	}

	destroy() {
		this.removeEventListeners();
	}

	setupEventListeners() {
		document.addEventListener('keydown', this.keyDownListener);
		document.addEventListener('keyup', this.keyUpListener);
		EngineGlobals.canvas.addEventListener('mousedown', this.mouseDownListener);
		document.addEventListener('mousemove', this.mouseMoveListener);
		EngineGlobals.canvas.addEventListener('mouseup', this.mouseUpListener);
	}

	removeEventListeners() {
		document.removeEventListener('keydown', this.keyDownListener);
		document.removeEventListener('keyup', this.keyUpListener);
		EngineGlobals.canvas.removeEventListener(
			'mousedown',
			this.mouseDownListener
		);
		document.removeEventListener('mousemove', this.mouseMoveListener);
		EngineGlobals.canvas.removeEventListener('mouseup', this.mouseUpListener);
	}

	update() {
		if (this.isMoving) {
			const direction = vec3.transformQuat(
				vec3.create(),
				vec3.scale(vec3.create(), this.direction, this.speed),
				this.gameObject.transform.rotation
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

		const deltaAngle =
			50 *
			Math.asin(
				vec2.length(vec2.fromValues(deltaX, deltaY)) /
					vec2.length(
						vec2.fromValues(
							EngineGlobals.canvas.clientWidth,
							EngineGlobals.canvas.clientHeight
						)
					)
			);

		this.gameObject.transform.rotate([deltaAngle * Math.sign(-deltaY), 0, 0]);
		this.gameObject.transform.rotate(
			[0, deltaAngle * Math.sign(-deltaX), 0],
			Space.World
		);
	}
}
