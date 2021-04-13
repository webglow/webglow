import { mat4, vec3 } from 'gl-matrix';

export default class Camera {
	constructor(gl, movementSpeed, initialPosition = [0, 0, 0]) {
		this.gl = gl;

		this.sensor = {
			width: 36,
			height: 24,
		};

		this.sensor.diagonal = Math.sqrt(
			this.sensor.width ** 2 + this.sensor.height ** 2
		);
		this.focalLength = 35;
		this.zoomStep = 5;

		this.setProjectionMatrix();

		this.mRotation = mat4.create();
		this.mTranslation = mat4.create();

		this.vPosition = vec3.create();

		this.viewMatrix = mat4.create();
		this.speed = movementSpeed;
		this.isMoving = false;
		this.direction = vec3.create();

		this.translate(initialPosition);

		this.updateViewMatrix();
	}

	setProjectionMatrix() {
		this.mProjection = mat4.create();
		mat4.perspective(
			this.mProjection,
			2 * Math.atan(this.sensor.diagonal / (2 * this.focalLength)),
			this.gl.canvas.clientWidth / this.gl.canvas.clientHeight,
			1
		);
	}

	zoom(direction) {
		if (this.focalLength + direction * this.zoomStep > 1 || direction > 0) {
			this.focalLength += direction * this.zoomStep;
		}

		this.setProjectionMatrix();
	}

	translate(translation) {
		mat4.translate(this.mTranslation, this.mTranslation, translation);

		this.updateViewMatrix();
	}

	rotate(angle, axis) {
		mat4.rotate(this.mRotation, this.mRotation, angle, [axis[0], 0, 0]);
		const inverseRotation = mat4.invert(mat4.create(), this.mRotation);
		const worldY = vec3.transformMat4(
			vec3.create(),
			vec3.fromValues(0, axis[1], 0),
			inverseRotation
		);
		mat4.rotate(this.mRotation, this.mRotation, angle, worldY);
		this.updateViewMatrix();
	}

	updateViewMatrix() {
		const cameraMatrix = mat4.create();
		this.vPosition = vec3.create();

		vec3.transformMat4(this.vPosition, this.vPosition, this.mTranslation);
		mat4.multiply(cameraMatrix, cameraMatrix, this.mTranslation);
		mat4.multiply(cameraMatrix, cameraMatrix, this.mRotation);

		mat4.invert(this.viewMatrix, cameraMatrix);
	}

	setMoving(direction) {
		this.direction = direction;
		this.isMoving = true;
	}

	stop() {
		this.direction = vec3.create();
		this.isMoving = false;
	}

	update() {
		if (this.isMoving) {
			this.translate(
				vec3.scale(
					vec3.create(),
					vec3.normalize(
						vec3.create(),
						vec3.transformMat4(vec3.create(), this.direction, this.mRotation)
					),
					this.speed
				)
			);
		}
	}
}
