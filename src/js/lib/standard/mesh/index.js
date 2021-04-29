import { mat4 } from 'gl-matrix';
import depthVertexSource from './shaders/depth/vertex.glsl';
import depthFragmentSource from './shaders/depth/fragment.glsl';
import VAO from '../vao';
import DefaultMaterial from '../materials/default';

export default class Mesh {
	constructor(
		gl,
		gameObject,
		{
			enableLighting = true,
			enableSpecular = false,
			specularStrength = 80,
			shadeColor,
		} = {}
	) {
		/** @type {WebGL2RenderingContext} */
		this.gl = gl;

		this.attribLocations = {
			aPosition: 0,
			aNormal: 1,
			aTextureCoord: 2,
		};

		this.materials = {
			default: new DefaultMaterial(this.gl, this.attribLocations, {
				enableLighting,
				enableSpecular,
				specularStrength,
				shadeColor,
			}),
		};
		this.vao = new VAO(this.gl, this.attribLocations);
		this.gameObject = gameObject;

		this.setupAttributes();
	}

	setupAttributes() {
		this.vao.setAttribute('aPosition', 3, this.gl.FLOAT);
		this.vao.setAttribute('aNormal', 3, this.gl.FLOAT);
		this.vao.setAttribute('aTextureCoord', 2, this.gl.FLOAT);
	}

	setPositions(positions) {
		this.vao.setBufferData('aPosition', positions);
	}

	setNormals(normals) {
		this.vao.setBufferData('aNormal', normals);
	}

	setTextureCoords(textureCoords) {
		this.vao.setBufferData('aTextureCoord', textureCoords);
	}

	setupColor(color) {
		this.texture = this.gl.createTexture();
		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

		const level = 0;
		const width = 1;
		const height = 1;
		const border = 0;
		const format = this.gl.RGBA;
		const type = this.gl.UNSIGNED_BYTE;
		const data = new Uint8Array(color);
		this.gl.texImage2D(
			this.gl.TEXTURE_2D,
			level,
			format,
			width,
			height,
			border,
			format,
			type,
			data
		);

		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MIN_FILTER,
			this.gl.NEAREST
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_MAG_FILTER,
			this.gl.NEAREST
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_S,
			this.gl.CLAMP_TO_EDGE
		);
		this.gl.texParameteri(
			this.gl.TEXTURE_2D,
			this.gl.TEXTURE_WRAP_T,
			this.gl.CLAMP_TO_EDGE
		);

		this.materials.default.setTexture(0);
	}

	setupDirectionalLight(lightSources) {
		this.materials.default.setDirectionalLights(lightSources);
	}

	setupPointLight(lightSources) {
		this.materials.default.setPointLights(lightSources);
	}

	updateMatrix(mProjection, viewWorldPosition, pov) {
		const world = this.updateWorldMatrix(viewWorldPosition);

		const worldViewProjection = this.gameObject.transform.getWorldViewProjection(
			world,
			mProjection,
			pov
		);

		this.materials.default.setWorldViewProjection(worldViewProjection);

		return worldViewProjection;
	}

	updateWorldMatrix(viewWorldPosition) {
		const world = this.gameObject.transform.getWorld(this.gameObject.node);

		const worldInverseTranspose = mat4.create();

		mat4.transpose(
			worldInverseTranspose,
			mat4.invert(worldInverseTranspose, world)
		);

		this.materials.default.setWorld(world);
		this.materials.default.setWorldInverseTranspose(worldInverseTranspose);
		this.materials.default.setViewWorldPosition(viewWorldPosition);

		return world;
	}

	draw(mProjection, viewWorldPosition, pov) {
		this.vao.bind();
		this.gl.activeTexture(this.gl.TEXTURE0);
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

		this.updateMatrix(mProjection, viewWorldPosition, pov);
	}
}
