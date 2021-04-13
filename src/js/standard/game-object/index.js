import { mat4 } from 'gl-matrix';
import GLProgram from '../gl-program';

export default class GameObject extends GLProgram {
	constructor(gl) {
		super(gl);

		this.mTranslation = mat4.create();
		this.mRotation = mat4.create();
		this.mScale = mat4.create();
	}

	setupAttributes() {
		super.setupAttributes();

		this.buffers.position = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.position);

		this.attributes.position = this.gl.getAttribLocation(
			this.program,
			'aPosition'
		);

		this.gl.vertexAttribPointer(
			this.attributes.position,
			3,
			this.gl.FLOAT,
			false,
			0,
			0
		);
		this.gl.enableVertexAttribArray(this.attributes.position);

		this.buffers.color = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.color);

		this.attributes.color = this.gl.getAttribLocation(this.program, 'aColor');

		this.gl.vertexAttribPointer(
			this.attributes.color,
			3,
			this.gl.FLOAT,
			false,
			0,
			0
		);

		this.gl.enableVertexAttribArray(this.attributes.color);

		this.buffers.normal = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffers.normal);

		this.attributes.normal = this.gl.getAttribLocation(this.program, 'aNormal');

		this.gl.vertexAttribPointer(
			this.attributes.normal,
			3,
			this.gl.FLOAT,
			false,
			0,
			0
		);
		this.gl.enableVertexAttribArray(this.attributes.normal);
	}

	setupUniforms() {
		super.setupUniforms();

		this.uniforms.worldViewProjection = this.gl.getUniformLocation(
			this.program,
			'uWorldViewProjection'
		);

		this.uniforms.worldMatrix = this.gl.getUniformLocation(
			this.program,
			'uWorldMatrix'
		);

		this.updateMatrix();
	}

	translate(translation) {
		mat4.translate(this.mTranslation, this.mTranslation, translation);
	}

	setPosition(position) {
		this.mTranslation = mat4.create();
		mat4.translate(this.mTranslation, this.mTranslation, position);
	}

	rotate(angle, axis) {
		mat4.rotate(this.mRotation, this.mRotation, angle, axis);
	}

	scale(scale) {
		mat4.scale(this.mScale, this.mScale, scale);
	}

	updateMatrix() {
		this.gl.useProgram(this.program);
		const uWorldMatrix = this.updateWorldMatrix();

		const uWorldViewProjection = mat4.create();
		const mViewProjection = mat4.create();
		mat4.multiply(
			mViewProjection,
			window.global.camera.mProjection,
			window.global.camera.viewMatrix
		);
		mat4.multiply(uWorldViewProjection, uWorldViewProjection, mViewProjection);
		mat4.multiply(uWorldViewProjection, uWorldViewProjection, uWorldMatrix);

		this.gl.uniformMatrix4fv(
			this.uniforms.worldViewProjection,
			false,
			uWorldViewProjection
		);
	}

	updateWorldMatrix() {
		const uWorldMatrix = mat4.create();
		mat4.multiply(uWorldMatrix, uWorldMatrix, this.mTranslation);
		mat4.multiply(uWorldMatrix, uWorldMatrix, this.mRotation);
		mat4.multiply(uWorldMatrix, uWorldMatrix, this.mScale);

		this.gl.uniformMatrix4fv(this.uniforms.worldMatrix, false, uWorldMatrix);

		return uWorldMatrix;
	}
}
