import { mat3, vec2 } from 'gl-matrix';
import HierarchyNode from '../../../utils/hierarchy/node';

export default class Transform2D {
	mTranslation: mat3;
	mRotation: mat3;
	mScale: mat3;

	constructor() {
		this.mTranslation = mat3.create();
		this.mRotation = mat3.create();
		this.mScale = mat3.create();
	}

	translate(translation: vec2) {
		mat3.translate(this.mTranslation, this.mTranslation, translation);
	}

	rotate(angle: number) {
		mat3.rotate(this.mRotation, this.mRotation, angle);
	}

	scale(scale: vec2) {
		mat3.scale(this.mScale, this.mScale, scale);
	}

	setPosition(position: vec2) {
		this.mTranslation = mat3.create();
		mat3.translate(this.mTranslation, this.mTranslation, position);
	}

	setRotation(angle: number) {
		this.mRotation = mat3.create();
		mat3.rotate(this.mRotation, this.mRotation, angle);
	}

	setScale(scale: vec2) {
		this.mScale = mat3.create();
		mat3.scale(this.mScale, this.mScale, scale);
	}

	get position() {
		return [this.mTranslation[6], this.mTranslation[7]];
	}

	getWorld(node: HierarchyNode): mat3 {
		if (!node || node.isRoot) {
			return mat3.create();
		}

		return mat3.multiply(
			mat3.create(),
			this.getWorld(node.parent),
			(node.gameObject.transform as any).getLocal()
		);
	}

	getWorldViewProjection(world: mat3, mProjection: mat3) {
		const worldViewProjection = mat3.create();
		mat3.multiply(worldViewProjection, worldViewProjection, mProjection);
		mat3.multiply(worldViewProjection, worldViewProjection, world);

		return worldViewProjection;
	}

	getLocal(): mat3 {
		const local = mat3.create();
		mat3.multiply(local, local, this.mTranslation);
		mat3.multiply(local, local, this.mRotation);
		mat3.multiply(local, local, this.mScale);

		return local;
	}
}
