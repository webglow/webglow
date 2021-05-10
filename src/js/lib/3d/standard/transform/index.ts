import { mat4, quat, vec3 } from 'gl-matrix';
import { v4 as uuidv4 } from 'uuid';
import { getEuler } from '../../../utils/helpers';
import HierarchyNode from '../../../utils/hierarchy/node';
import { Subscriber, TransformInfo } from './types';

export default class Transform {
	mTranslation: mat4;
	mRotation: mat4;
	mScale: mat4;
	subscribers: Subscriber;
	node: HierarchyNode;

	constructor(node?: HierarchyNode) {
		this.mTranslation = mat4.create();
		this.mRotation = mat4.create();
		this.mScale = mat4.create();
		this.node = node;

		this.subscribers = {};
	}

	translate(translation: vec3) {
		mat4.translate(this.mTranslation, this.mTranslation, translation);

		this.onChange();
	}

	rotate(angle: number, axis: vec3) {
		mat4.rotate(this.mRotation, this.mRotation, angle, axis);

		this.onChange();
	}

	scale(scale: vec3) {
		mat4.scale(this.mScale, this.mScale, scale);

		this.onChange();
	}

	setPosition(position: vec3, notify: boolean = true) {
		this.mTranslation = mat4.create();
		mat4.translate(this.mTranslation, this.mTranslation, position);

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
		return mat4.getTranslation(vec3.create(), this.mTranslation);
	}

	get rotation() {
		return getEuler(mat4.getRotation(quat.create(), this.mRotation));
	}

	get scaling() {
		return mat4.getScaling(vec3.create(), this.mScale);
	}

	get transform(): TransformInfo {
		return {
			position: this.position,
			rotation: this.rotation,
			scale: this.scaling,
		};
	}

	get viewMatrix() {
		return mat4.invert(mat4.create(), this.getLocal());
	}

	getWorld(node: HierarchyNode): mat4 {
		if (!node || node.isRoot) {
			return mat4.create();
		}

		return mat4.multiply(
			mat4.create(),
			this.getWorld(node.parent),
			node.gameObject.transform.getLocal()
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

	getLocal() {
		const local = mat4.create();
		mat4.multiply(local, local, this.mTranslation);
		mat4.multiply(local, local, this.mRotation);
		mat4.multiply(local, local, this.mScale);

		return local;
	}

	subscribe(callback: (info: TransformInfo) => void) {
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

	setTransform(transform: TransformInfo) {
		this.setPosition(transform.position, false);
		this.setRotationFromEuler(
			transform.rotation as [number, number, number],
			false
		);
		this.setScale(transform.scale, false);

		this.onChange();
	}
}
