import { vec3 } from 'gl-matrix';
import Collider from '.';

export default class BoxCollider extends Collider {
	constructor(gameObject, { min, max }) {
		super(gameObject);

		this._min = min;
		this._max = max;
	}

	get min() {
		return vec3.transformMat4(
			vec3.create(),
			this._min,
			this.gameObject.transform.getWorld(this.gameObject.node)
		);
	}

	get max() {
		return vec3.transformMat4(
			vec3.create(),
			this._max,
			this.gameObject.transform.getWorld(this.gameObject.node)
		);
	}
}
