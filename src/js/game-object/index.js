import { mat4 } from 'gl-matrix';
import GLProgram from '../gl-program';

export default class GameObject extends GLProgram {
	constructor(gl) {
		super(gl);

		this.mTranslation = mat4.create();
		this.mRotation = mat4.create();
		this.mScale = mat4.create();
		this.mProjection = mat4.create();
		mat4.perspective(
			this.mProjection,
			Math.PI / 2,
			this.gl.canvas.clientWidth / this.gl.canvas.clientHeight,
			1
		);
	}

	setupAttributes() {
		super.setupAttributes();

		this.positionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);

		this.attributes.positionAttributeLocation = this.gl.getAttribLocation(
			this.program,
			'aPosition'
		);

		this.gl.vertexAttribPointer(
			this.attributes.positionAttributeLocation,
			3,
			this.gl.FLOAT,
			false,
			0,
			0
		);
		this.gl.enableVertexAttribArray(this.attributes.positionAttributeLocation);

		this.colorsBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorsBuffer);

		this.attributes.colorAttributeLocation = this.gl.getAttribLocation(
			this.program,
			'aColor'
		);

		this.gl.vertexAttribPointer(
			this.attributes.colorAttributeLocation,
			3,
			this.gl.FLOAT,
			false,
			0,
			0
		);

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

		const uMatrix = mat4.create();
		const mViewProjection = mat4.create();
		mat4.multiply(
			mViewProjection,
			this.mProjection,
			window.global.camera.viewMatrix
		);
		mat4.multiply(uMatrix, uMatrix, mViewProjection);
		mat4.multiply(uMatrix, uMatrix, this.mTranslation);
		mat4.multiply(uMatrix, uMatrix, this.mRotation);
		mat4.multiply(uMatrix, uMatrix, this.mScale);

		this.gl.uniformMatrix4fv(this.uniforms.matrixLocation, false, uMatrix);
	}
}
