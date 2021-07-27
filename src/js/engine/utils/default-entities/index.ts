import Box from '../../primitives/box';
import Cone from '../../primitives/cone';
import Cylinder from '../../primitives/cylinder';
import Plane from '../../primitives/plane';
import Sphere from '../../primitives/sphere';
import { IGeometry } from '../../standard/geometry';
import GameObject from '../game-object';
import Material from '../material';
import SceneHierarchy from '../scene-hierarchy';

export default class DefaultEntities {
	static add3dObject(
		hierarchy: SceneHierarchy,
		geometry: IGeometry,
		type: string,
		parent?: GameObject
	) {
		const gameObject = new GameObject();
		gameObject.addMesh(geometry);
		gameObject.addMaterial(new Material());

		if (parent) {
			gameObject.setParent(parent);
		}

		hierarchy.addObject(gameObject);
		hierarchy.rename(gameObject, `${type} (${gameObject.id})`);
	}

	static addBox(hierarchy: SceneHierarchy, parent?: GameObject) {
		DefaultEntities.add3dObject(
			hierarchy,
			new Box({ size: [1, 1, 1] }),
			'Box',
			parent
		);
	}

	static addPlane(hierarchy: SceneHierarchy, parent?: GameObject) {
		DefaultEntities.add3dObject(
			hierarchy,
			new Plane({
				width: 50,
				length: 50,
				widthSegments: 1,
				lengthSegments: 1,
			}),
			'Plane',
			parent
		);
	}

	static addSphere(hierarchy: SceneHierarchy, parent?: GameObject) {
		DefaultEntities.add3dObject(
			hierarchy,
			new Sphere({
				widthSegments: 30,
				heightSegments: 30,
				radius: 1,
			}),
			'Sphere',
			parent
		);
	}

	static addCylinder(hierarchy: SceneHierarchy, parent?: GameObject) {
		DefaultEntities.add3dObject(
			hierarchy,
			new Cylinder({
				segments: 30,
				radius: 1,
				height: 2,
			}),
			'Cylinder',
			parent
		);
	}

	static addCone(hierarchy: SceneHierarchy, parent?: GameObject) {
		DefaultEntities.add3dObject(
			hierarchy,
			new Cone({
				segments: 30,
				radius: 1,
				height: 2,
			}),
			'Cone',
			parent
		);
	}

	static addEmpty(hierarchy: SceneHierarchy, parent?: GameObject) {
		const gameObject = new GameObject();

		if (parent) {
			gameObject.setParent(parent);
		}

		hierarchy.addObject(gameObject);
		hierarchy.rename(gameObject, `GameObject (${gameObject.id})`);
	}
}
