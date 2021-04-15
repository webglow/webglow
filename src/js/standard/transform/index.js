import { mat4, vec3 } from 'gl-matrix';

export default class Transform {
	constructor() {
		this.mTranslation = mat4.create();
		this.mRotation = mat4.create();
		this.mScale = mat4.create();

		this.vPosition = vec3.create();
		this.vRotation = vec3.create();
		this.vScale = vec3.create();
	}

	translate(translation) {
		mat4.translate(this.mTranslation, this.mTranslation, translation);

		this.updateVPosition();
	}

	rotate(angle, axis) {
		mat4.rotate(this.mRotation, this.mRotation, angle, axis);

		this.updateVRotation();
	}

	scale(scale) {
		mat4.scale(this.mScale, this.mScale, scale);

		this.updateVScale();
	}

	setPosition(position) {
		this.mTranslation = mat4.create();
		mat4.translate(this.mTranslation, this.mTranslation, position);

		this.updateVPosition();
	}

	setRotation(angle, axis) {
		this.mRotation = mat4.create();
		mat4.rotate(this.mRotation, this.mRotation, angle, axis);

		this.updateVRotation();
	}

	setScale(scale) {
		this.mScale = mat4.create();
		mat4.scale(this.mScale, this.mScale, scale);

		this.updateVScale();
	}

	updateVPosition() {
		this.vPosition = vec3.create();

		vec3.transformMat4(this.vPosition, this.vPosition, this.mTranslation);
	}

	updateVRotation() {
		this.vRotation = vec3.create();

		vec3.transformMat4(this.vRotation, this.vRotation, this.mRotation);
	}

	updateVScale() {
		this.vScale = vec3.create();

		vec3.transformMat4(this.vScale, this.vScale, this.mScale);
	}

	getWorld(node) {
		if (!node || node.isRoot) {
			return mat4.create();
		}

		return mat4.multiply(
			mat4.create(),
			this.getWorld(node.parent),
			node.objectInstance.transform.getLocal()
		);
	}

	getWorldViewProjection(world) {
		const worldMatrix = world;

		const worldViewProjection = mat4.create();
		const mViewProjection = mat4.create();
		mat4.multiply(
			mViewProjection,
			window.global.camera.mProjection,
			window.global.camera.viewMatrix
		);
		mat4.multiply(worldViewProjection, worldViewProjection, mViewProjection);
		mat4.multiply(worldViewProjection, worldViewProjection, worldMatrix);

		return worldViewProjection;
	}

	getLocal() {
		const local = mat4.create();
		mat4.multiply(local, local, this.mTranslation);
		mat4.multiply(local, local, this.mRotation);
		mat4.multiply(local, local, this.mScale);

		return local;
	}
}
