import { mat4 } from 'gl-matrix';
import GLProgram from '../gl-program';

export default class GameObject extends GLProgram {
	constructor(gl) {
		super(gl);

		this.mProjection = mat4.create();
		mat4.perspective(
			this.mProjection,
			Math.PI / 2,
			this.gl.canvas.clientWidth / this.gl.canvas.clientHeight,
			1
		);
		this.mTranslation = mat4.create();
		this.mRotation = mat4.create();
		this.mScale = mat4.create();
	}

	setupAttributes() {
		super.setupAttributes();

		this.attributes.positionAttributeLocation = this.gl.getAttribLocation(
			this.program,
			'aPosition'
		);

		this.gl.vertexAttribPointer(
			this.attributes.positionAttributeLocation,
			3,
			this.gl.FLOAT,
			false,
			6 * Float32Array.BYTES_PER_ELEMENT,
			0
		);

		this.attributes.colorAttributeLocation = this.gl.getAttribLocation(
			this.program,
			'aColor'
		);

		this.gl.vertexAttribPointer(
			this.attributes.colorAttributeLocation,
			3,
			this.gl.FLOAT,
			false,
			6 * Float32Array.BYTES_PER_ELEMENT,
			3 * Float32Array.BYTES_PER_ELEMENT
		);

		this.gl.enableVertexAttribArray(this.attributes.positionAttributeLocation);
		this.gl.enableVertexAttribArray(this.attributes.colorAttributeLocation);
	}

	setupUniforms() {
		super.setupUniforms();

		this.uniforms.matrixLocation = this.gl.getUniformLocation(
			this.program,
			'uMatrix'
		);

		this.updateMatrix();
	}

	translate(translation) {
		mat4.translate(this.mTranslation, this.mTranslation, translation);
	}

	rotate(angle, axis) {
		mat4.rotate(this.mRotation, this.mRotation, angle, axis);
	}

	scale(scale) {
		mat4.scale(this.mScale, this.mScale, scale);
	}

	updateMatrix() {
		this.gl.useProgram(this.program);

		const uMatrix = mat4.create();
		mat4.multiply(uMatrix, uMatrix, this.mProjection);
		mat4.multiply(uMatrix, uMatrix, this.mTranslation);
		mat4.multiply(uMatrix, uMatrix, this.mRotation);
		mat4.multiply(uMatrix, uMatrix, this.mScale);

		this.gl.uniformMatrix4fv(this.uniforms.matrixLocation, false, uMatrix);
	}
}
