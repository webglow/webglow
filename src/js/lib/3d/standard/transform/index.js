import { mat4, vec3 } from 'gl-matrix';

export default class Transform {
	constructor(onChange = () => {}) {
		this.mTranslation = mat4.create();
		this.mRotation = mat4.create();
		this.mScale = mat4.create();

		this.onChange = onChange;
	}

	translate(translation) {
		mat4.translate(this.mTranslation, this.mTranslation, translation);

		this.onChange();
	}

	rotate(angle, axis) {
		mat4.rotate(this.mRotation, this.mRotation, angle, axis);

		this.onChange();
	}

	scale(scale) {
		mat4.scale(this.mScale, this.mScale, scale);

		this.onChange();
	}

	setPosition(position) {
		this.mTranslation = mat4.create();
		mat4.translate(this.mTranslation, this.mTranslation, position);

		this.onChange();
	}

	setRotation(angle, axis) {
		this.mRotation = mat4.create();
		mat4.rotate(this.mRotation, this.mRotation, angle, axis);

		this.onChange();
	}

	setScale(scale) {
		this.mScale = mat4.create();
		mat4.scale(this.mScale, this.mScale, scale);

		this.onChange();
	}

	get position() {
		return mat4.getTranslation(vec3.create(), this.mTranslation);
	}

	get rotation() {
		return mat4.getRotation(vec3.create(), this.mRotation);
	}

	get scaling() {
		return mat4.getScaling(vec3.create(), this.mScale);
	}

	get viewMatrix() {
		return mat4.invert(mat4.create(), this.getLocal());
	}

	getWorld(node) {
		if (!node || node.isRoot) {
			return mat4.create();
		}

		return mat4.multiply(
			mat4.create(),
			this.getWorld(node.parent),
			node.gameObject.transform.getLocal()
		);
	}

	getWorldViewProjection(world, mProjection, pov) {
		const worldMatrix = world;

		const worldViewProjection = mat4.create();
		const mViewProjection = mat4.create();
		mat4.multiply(mViewProjection, mProjection, pov);
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
