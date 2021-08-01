import { mat4, vec3 } from 'gl-matrix';
import EngineGlobals from '../../globals';
import Light from '../../standard/light';
import { LightType } from '../../standard/light/types';
import GameObject from '../game-object';
import Material from '../material';
import Shader from '../shader';
import { UniformType } from '../shader-program/types';
import VAO from '../vao';
import { IMeshRendererJSON } from './types';

export default class MeshRenderer {
	attribLocations: {
		[key: string]: number;
	};

	vao: VAO;
	material: Material;
	gameObject: GameObject;

	constructor(gameObject: GameObject, material: Material = Material.default()) {
		this.vao = new VAO(Shader.defaultAttribLocations());

		this.gameObject = gameObject;
		this.material = material;

		this.setupAttributes();

		this.setPositions();
		this.setNormals();
		this.setTextureCoords();
	}

	toJSON(): IMeshRendererJSON {
		return {
			materialId: this.material.id,
		};
	}

	static fromJSON(gameObject: GameObject, { materialId }: IMeshRendererJSON) {
		if (materialId === 'default') {
			return new MeshRenderer(gameObject);
		}
	}

	setWorldViewProjection(mWorldViewProjection: mat4) {
		this.material.shaderProgram.setUniform(
			UniformType.t_mat4,
			'uWorldViewProjection',
			mWorldViewProjection
		);
	}

	setWorld(mWorld: mat4) {
		this.material.shaderProgram.setUniform(
			UniformType.t_mat4,
			'uWorld',
			mWorld
		);
	}

	setWorldInverseTranspose(mWorldInverseTranspose: mat4) {
		this.material.shaderProgram.setUniform(
			UniformType.t_mat4,
			'uWorldInverseTranspose',
			mWorldInverseTranspose
		);
	}

	setViewWorldPosition(vViewWorldPosition: vec3) {
		this.material.shaderProgram.setUniform(
			UniformType.t_vec3,
			'uViewWorldPosition',
			vViewWorldPosition
		);
	}

	setLights(type: LightType, lightSources: Light[]) {
		if (!lightSources || !lightSources.length) {
			return;
		}

		const matKey =
			type === LightType.Point ? 'uPointLight' : 'uDirectionalLight';
		const numKey =
			type === LightType.Point
				? 'uPointLightNumber'
				: 'uDirectionalLightNumber';

		this.material.shaderProgram.setUniform(UniformType.t_mat3, matKey, [
			new Float32Array(lightSources.map((l) => l.toMat3Array()).flat()),
			0,
			lightSources.length * 3 * 3,
		]);
		this.material.shaderProgram.setUniform(
			UniformType.t_uint,
			numKey,
			lightSources.length
		);
	}

	updateMatrix(mProjection: mat4, viewWorldPosition: vec3, pov: mat4) {
		const world = this.updateWorldMatrix(viewWorldPosition);

		const worldViewProjection = this.gameObject.transform.getWorldViewProjection(
			world,
			mProjection,
			pov
		);

		this.setWorldViewProjection(worldViewProjection);

		return worldViewProjection;
	}

	updateWorldMatrix(viewWorldPosition: vec3) {
		const world = this.gameObject.transform.getWorld();

		const worldInverseTranspose = mat4.create();

		mat4.transpose(
			worldInverseTranspose,
			mat4.invert(worldInverseTranspose, world)
		);

		this.setWorld(world);
		this.setWorldInverseTranspose(worldInverseTranspose);
		this.setViewWorldPosition(viewWorldPosition);

		return world;
	}

	setupAttributes() {
		this.vao.setAttribute('aPosition', 3, EngineGlobals.gl.FLOAT);
		this.vao.setAttribute('aNormal', 3, EngineGlobals.gl.FLOAT);
		this.vao.setAttribute('aTextureCoord', 2, EngineGlobals.gl.FLOAT);
	}

	setPositions() {
		this.vao.setBufferData(
			'aPosition',
			this.gameObject.mesh.geometry.positions
		);
	}

	setNormals() {
		this.vao.setBufferData('aNormal', this.gameObject.mesh.geometry.normals);
	}

	setTextureCoords() {
		this.vao.setBufferData(
			'aTextureCoord',
			this.gameObject.mesh.geometry.textureCoords
		);
	}

	render(mProjection: mat4, viewWorldPosition: vec3, pov: mat4) {
		this.vao.bind();

		this.material.bindTexture();

		this.updateMatrix(mProjection, viewWorldPosition, pov);

		EngineGlobals.gl.drawArrays(
			EngineGlobals.gl.TRIANGLES,
			0,
			this.gameObject.mesh.geometry.positions.length / 3
		);
	}
}
