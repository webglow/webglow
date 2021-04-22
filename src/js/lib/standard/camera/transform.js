import { mat4, vec3 } from 'gl-matrix';
import Transform from '../transform';

export default class CameraTransform extends Transform {
	rotate(angle, axis) {
		mat4.rotate(this.mRotation, this.mRotation, angle, [axis[0], 0, 0]);
		const inverseRotation = mat4.invert(mat4.create(), this.mRotation);
		const worldY = vec3.transformMat4(
			vec3.create(),
			vec3.fromValues(0, axis[1], 0),
			inverseRotation
		);
		mat4.rotate(this.mRotation, this.mRotation, angle, worldY);
		this.onChange();
	}
}
