import EngineGlobals from 'engine/globals';
import { IMeshJSON } from 'engine/standard/mesh/types';
import Geometry from '../geometry';

export default class Mesh {
	geometry: Geometry;

	constructor(geometry: Geometry) {
		this.geometry = geometry;
		this.geometry.construct();
	}

	toJSON(): IMeshJSON {
		return {
			geometryId: this.geometry.id,
		};
	}

	static fromJSON({ geometryId }: IMeshJSON) {
		return new Mesh(EngineGlobals.geometryPool.get(geometryId));
	}
}
