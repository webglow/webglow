import { MF } from 'engine/utils/constants';
import { Space } from 'engine/utils/enums';
import GameObject from 'engine/utils/game-object';
import { getEuler } from 'engine/utils/helpers';
import { mat4, quat, vec3 } from 'gl-matrix';
import { v4 as uuidv4 } from 'uuid';
import { ISubscriber, ITransformInfo, ITransformJSON } from './types';

export default class Transform {
	_position: vec3;
	_rotation: quat;
	_scale: vec3;

	subscribers: ISubscriber;
	gameObject: GameObject;

	constructor(
		gameObject: GameObject,
		{
			position = vec3.create(),
			rotation = quat.create(),
			scale = vec3.fromValues(1, 1, 1),
		} = {}
	) {
		this._position = position;
		this._rotation = rotation;
		this._scale = scale;
		this.gameObject = gameObject;

		this.subscribers = {};
	}

	toJSON(): ITransformJSON {
		return {
			position: Array.from(this._position) as [number, number, number],
			rotation: Array.from(this._rotation) as [number, number, number, number],
			scale: Array.from(this._scale) as [number, number, number],
		};
	}

	static fromJSON(
		gameObject: GameObject,
		{ position, rotation, scale }: ITransformJSON
	): Transform {
		return new Transform(gameObject, { position, rotation, scale });
	}

	get position() {
		return vec3.scale(vec3.create(), this._position, 1 / MF);
	}

	get rotation() {
		return getEuler(this._rotation) as [number, number, number];
	}

	get quatRotation() {
		return quat.fromValues(
			...(this._rotation as [number, number, number, number])
		);
	}

	get scale() {
		return vec3.fromValues(...(this._scale as [number, number, number]));
	}

	set position(newValue: vec3) {
		this._position = vec3.scale(vec3.create(), newValue, MF);

		this.onChange();
	}

	set rotation(newValue: [number, number, number]) {
		quat.fromEuler(this._rotation, ...newValue);

		this.onChange();
	}

	set scale(newValue: vec3) {
		this._scale = newValue;

		this.onChange();
	}

	translate(translation: vec3) {
		vec3.add(
			this._position,
			this._position,
			vec3.scale(vec3.create(), translation, MF)
		);

		this.onChange();
	}

	rotate(eulerAngles: [number, number, number], space = Space.Local) {
		const quatRotation = quat.fromEuler(quat.create(), ...eulerAngles);

		switch (space) {
			case Space.Local:
				quat.mul(this._rotation, this._rotation, quatRotation);
				break;
			case Space.World:
				quat.mul(this._rotation, quatRotation, this._rotation);
				break;
			default:
				break;
		}

		this.onChange();
	}

	get transform(): ITransformInfo {
		return {
			position: this.position,
			rotation: this.rotation,
			scale: this.scale,
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
		const local = mat4.identity(mat4.create());
		mat4.translate(local, local, this._position);
		mat4.multiply(local, local, mat4.fromQuat(mat4.create(), this._rotation));
		mat4.scale(local, local, this._scale);

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
}
