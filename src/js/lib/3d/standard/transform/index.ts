import { mat4, quat, vec3 } from 'gl-matrix';
import { v4 as uuidv4 } from 'uuid';
import { MF } from '../../../utils/constants';
import { Space } from '../../../utils/enums';
import GameObject from '../../../utils/game-object';
import { getEuler } from '../../../utils/helpers';
import { ISubscriber, ITransformInfo } from './types';

export default class Transform {
	mTranslation: mat4;
	mRotation: mat4;
	mScale: mat4;
	subscribers: ISubscriber;
	gameObject: GameObject;

	constructor(gameObject?: GameObject) {
		this.mTranslation = mat4.create();
		this.mRotation = mat4.create();
		this.mScale = mat4.create();
		this.gameObject = gameObject;

		this.subscribers = {};
	}

	translate(translation: vec3) {
		mat4.translate(
			this.mTranslation,
			this.mTranslation,
			vec3.scale(vec3.create(), translation, MF)
		);

		this.onChange();
	}

	rotateLocalSpace(angle: number, axis: vec3) {
		mat4.rotate(this.mRotation, this.mRotation, angle, axis);
	}

	rotateWorldSpace(angle: number, axis: vec3) {
		const inverseRotation = mat4.invert(mat4.create(), this.mRotation);
		const worldRotation = vec3.transformMat4(
			vec3.create(),
			axis,
			inverseRotation
		);
		mat4.rotate(this.mRotation, this.mRotation, angle, worldRotation);
	}

	rotate(angle: number, axis: vec3, space = Space.Local) {
		switch (space) {
			case Space.Local:
				this.rotateLocalSpace(angle, axis);
				break;
			case Space.World:
				this.rotateWorldSpace(angle, axis);
				break;
			default:
				break;
		}

		this.onChange();
	}

	scale(scale: vec3) {
		mat4.scale(this.mScale, this.mScale, scale);

		this.onChange();
	}

	setPosition(position: vec3, notify: boolean = true) {
		this.mTranslation = mat4.create();
		mat4.translate(
			this.mTranslation,
			this.mTranslation,
			vec3.scale(vec3.create(), position, MF)
		);

		if (notify) {
			this.onChange();
		}
	}

	setRotation(angle: number, axis: vec3, notify: boolean = true) {
		this.mRotation = mat4.create();
		mat4.rotate(this.mRotation, this.mRotation, angle, axis);

		if (notify) {
			this.onChange();
		}
	}

	setRotationFromEuler(
		eulerAngles: [number, number, number],
		notify: boolean = true
	) {
		mat4.fromQuat(
			this.mRotation,
			quat.fromEuler(quat.create(), ...eulerAngles)
		);

		if (notify) {
			this.onChange();
		}
	}

	setScale(scale: vec3, notify: boolean = true) {
		this.mScale = mat4.create();
		mat4.scale(this.mScale, this.mScale, scale);

		if (notify) {
			this.onChange();
		}
	}

	get position() {
		const position = vec3.create();
		mat4.getTranslation(position, this.mTranslation);
		vec3.scale(position, position, 1 / MF);
		return position;
	}

	get rotation() {
		return getEuler(mat4.getRotation(quat.create(), this.mRotation));
	}

	get scaling() {
		return mat4.getScaling(vec3.create(), this.mScale);
	}

	get transform(): ITransformInfo {
		return {
			position: this.position,
			rotation: this.rotation,
			scale: this.scaling,
		};
	}

	get viewMatrix() {
		return mat4.invert(mat4.create(), this.getLocal());
	}

	getWorld(): mat4 {
		if (!this.gameObject || this.gameObject.isRoot) {
			return mat4.create();
		}

		return mat4.multiply(
			mat4.create(),
			this.gameObject.parent.transform.getWorld(),
			this.gameObject.transform.getLocal()
		);
	}

	getWorldViewProjection(world: mat4, mProjection: mat4, pov: mat4) {
		const worldMatrix = world;

		const worldViewProjection = mat4.create();
		const mViewProjection = mat4.create();
		mat4.multiply(mViewProjection, mProjection, pov);
		mat4.multiply(worldViewProjection, worldViewProjection, mViewProjection);
		mat4.multiply(worldViewProjection, worldViewProjection, worldMatrix);

		return worldViewProjection;
	}

	getLocal(): mat4 {
		const local = mat4.create();
		mat4.multiply(local, local, this.mTranslation);
		mat4.multiply(local, local, this.mRotation);
		mat4.multiply(local, local, this.mScale);

		return local;
	}

	subscribe(callback: (info: ITransformInfo) => void) {
		const id = uuidv4();
		this.subscribers[id] = callback;

		return id;
	}

	unsubscribe(id: string) {
		delete this.subscribers[id];
	}

	onChange() {
		const info = this.transform;

		Object.keys(this.subscribers).forEach((key) => {
			this.subscribers[key](info);
		});
	}

	setTransform(transform: ITransformInfo) {
		this.setPosition(transform.position, false);
		this.setRotationFromEuler(
			transform.rotation as [number, number, number],
			false
		);
		this.setScale(transform.scale, false);

		this.onChange();
	}
}
