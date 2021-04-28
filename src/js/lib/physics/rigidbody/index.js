import { vec3 } from 'gl-matrix';

export default class RigidBody {
	constructor(gameObject, { mass = 1 } = {}) {
		this.gameObject = gameObject;
		this.mass = mass;
		this.velocity = [0, 0, 0];

		this.friction = 0.01;
		this.gravity = [0, -1000 * 9.8, 0];

		this.isFalling = true;
	}

	addForce(force) {
		vec3.add(this.velocity, this.velocity, force);
	}

	onCollision() {
		this.isFalling = false;
		this.velocity = [0, 0, 0];
	}

	move() {
		vec3.scale(this.velocity, this.velocity, 1 - this.friction);

		if (this.isFalling) {
			this.addForce(
				vec3.scale(vec3.create(), this.gravity, window.global.deltaTime)
			);
		}

		this.gameObject.transform.translate(
			vec3.scale(vec3.create(), this.velocity, window.global.deltaTime)
		);
	}
}
