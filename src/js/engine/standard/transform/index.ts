import { Space } from 'engine/utils/enums';
import GameObject from 'engine/utils/game-object';
import { getEuler } from 'engine/utils/helpers';
import { mat4, quat, vec3 } from 'gl-matrix';
import { makeAutoObservable, makeObservable, observable } from 'mobx';
import { ITransformInfo, ITransformJSON } from './types';

export default class Transform {
	position: vec3;
	rotation: quat;
	_eulerRotation: vec3;
	scale: vec3;

	gameObject: GameObject;

	constructor(
		gameObject: GameObject,
		{
			position = vec3.create(),
			rotation = quat.create(),
			scale = vec3.fromValues(1, 1, 1),
		} = {}
	) {
		this.position = position;
		this.rotation = rotation;
		this._eulerRotation = getEuler(this.rotation);
		this.scale = scale;
		this.gameObject = gameObject;

		makeObservable(this, {
			position: observable,
			rotation: observable,
			scale: observable,
			gameObject: observable.ref,
		});
	}

	toJSON(): ITransformJSON {
		return {
			position: Array.from(this.position) as [number, number, number],
			rotation: Array.from(this.rotation) as [number, number, number, number],
			scale: Array.from(this.scale) as [number, number, number],
		};
	}

	static fromJSON(
		gameObject: GameObject,
		{ position, rotation, scale }: ITransformJSON
	): Transform {
		return new Transform(gameObject, { position, rotation, scale });
	}

	get eulerRotation() {
		return this._eulerRotation as [number, number, number];
	}

	set eulerRotation(newValue: [number, number, number]) {
		quat.fromEuler(this.rotation, ...newValue);

		vec3.copy(this._eulerRotation, newValue);
	}

	translate(translation: vec3) {
		vec3.add(this.position, this.position, translation);
	}

	rotate(eulerAngles: [number, number, number], space = Space.Local) {
		const quatRotation = quat.fromEuler(quat.create(), ...eulerAngles);

		switch (space) {
			case Space.Local:
				quat.mul(this.rotation, this.rotation, quatRotation);
				break;
			case Space.World:
				quat.mul(this.rotation, quatRotation, this.rotation);
				break;
			default:
				break;
		}
	}

	get transform(): ITransformInfo {
		return {
			position: this.position,
			rotation: this.rotation,
			eulerRotation: this.eulerRotation,
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
		mat4.translate(local, local, this.position);
		mat4.multiply(local, local, mat4.fromQuat(mat4.create(), this.rotation));
		mat4.scale(local, local, this.scale);

		return local;
	}
}
