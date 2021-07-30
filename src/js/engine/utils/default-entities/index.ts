import Box from '../../geometry/box';
import Cone from '../../geometry/cone';
import Cylinder from '../../geometry/cylinder';
import Plane from '../../geometry/plane';
import Sphere from '../../geometry/sphere';
import EngineGlobals from '../../globals';
import Geometry from '../../standard/geometry';
import GameObject from '../game-object';
import Material from '../material';
import SceneHierarchy from '../scene-hierarchy';

export default class DefaultEntities {
	static add3dObject(
		hierarchy: SceneHierarchy,
		geometry: Geometry,
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
			EngineGlobals.geometryPool.get('Box'),
			'Box',
			parent
		);
	}

	static addPlane(hierarchy: SceneHierarchy, parent?: GameObject) {
		DefaultEntities.add3dObject(
			hierarchy,
			EngineGlobals.geometryPool.get('Plane'),
			'Plane',
			parent
		);
	}

	static addSphere(hierarchy: SceneHierarchy, parent?: GameObject) {
		DefaultEntities.add3dObject(
			hierarchy,
			EngineGlobals.geometryPool.get('Sphere'),
			'Sphere',
			parent
		);
	}

	static addCylinder(hierarchy: SceneHierarchy, parent?: GameObject) {
		DefaultEntities.add3dObject(
			hierarchy,
			EngineGlobals.geometryPool.get('Cylinder'),
			'Cylinder',
			parent
		);
	}

	static addCone(hierarchy: SceneHierarchy, parent?: GameObject) {
		DefaultEntities.add3dObject(
			hierarchy,
			EngineGlobals.geometryPool.get('Cone'),
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
