import Box from '../../geometry/box';
import Cone from '../../geometry/cone';
import Cylinder from '../../geometry/cylinder';
import Plane from '../../geometry/plane';
import Sphere from '../../geometry/sphere';
import Geometry from '../../standard/geometry';
import Model from '../model';

export default class GeometryPool {
	pool: { [key: string]: Geometry } = {};
	models: { [key: string]: Model } = {};

	getModelGeometry(id: string) {
		const { modelId, groupName } = id.match(
			/(?<modelId>.*)<(?<groupName>.*)>/
		).groups;

		if (this.models[modelId]) {
			return this.models[modelId].findById(id);
		}

		return Geometry.emtpy(id, groupName);
	}

	get(id: string) {
		if (this.pool[id]) {
			return this.pool[id];
		}

		let item: Geometry;

		switch (id) {
			case 'Box':
				item = new Box({ size: [1, 1, 1] });
				break;
			case 'Cone':
				item = new Cone({
					segments: 30,
					radius: 1,
					height: 2,
				});
				break;
			case 'Plane':
				item = new Plane({
					width: 50,
					length: 50,
					widthSegments: 1,
					lengthSegments: 1,
				});
				break;
			case 'Sphere':
				item = new Sphere({
					widthSegments: 30,
					heightSegments: 30,
					radius: 1,
				});
				break;
			case 'Cylinder':
				item = new Cylinder({
					segments: 30,
					radius: 1,
					height: 2,
				});
				break;
			default:
				item = this.getModelGeometry(id);

				break;
		}

		this.pool[id] = item;

		return item;
	}

	registerModel(id: string, model: Model) {
		this.models[id] = model;
	}
}
