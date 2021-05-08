import { mat3 } from 'gl-matrix';

export default class Transform2D {
	constructor() {
		this.mTranslation = mat3.create();
		this.mRotation = mat3.create();
		this.mScale = mat3.create();
	}

	translate(translation) {
		mat3.translate(this.mTranslation, this.mTranslation, translation);
	}

	rotate(angle, axis) {
		mat3.rotate(this.mRotation, this.mRotation, angle, axis);
	}

	scale(scale) {
		mat3.scale(this.mScale, this.mScale, scale);
	}

	setPosition(position) {
		this.mTranslation = mat3.create();
		mat3.translate(this.mTranslation, this.mTranslation, position);
	}

	setRotation(angle, axis) {
		this.mRotation = mat3.create();
		mat3.rotate(this.mRotation, this.mRotation, angle, axis);
	}

	setScale(scale) {
		this.mScale = mat3.create();
		mat3.scale(this.mScale, this.mScale, scale);
	}

	get position() {
		return [this.mTranslation[6], this.mTranslation[7]];
	}

	getWorld(node) {
		if (!node || node.isRoot) {
			return mat3.create();
		}

		return mat3.multiply(
			mat3.create(),
			this.getWorld(node.parent),
			node.gameObject.transform.getLocal()
		);
	}

	getWorldViewProjection(world, mProjection) {
		const worldViewProjection = mat3.create();
		mat3.multiply(worldViewProjection, worldViewProjection, mProjection);
		mat3.multiply(worldViewProjection, worldViewProjection, world);

		return worldViewProjection;
	}

	getLocal() {
		const local = mat3.create();
		mat3.multiply(local, local, this.mTranslation);
		mat3.multiply(local, local, this.mRotation);
		mat3.multiply(local, local, this.mScale);

		return local;
	}
}
