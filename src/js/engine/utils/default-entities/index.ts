import EngineGlobals from '../../globals';
import Geometry from '../../standard/geometry';
import { LightType } from '../../standard/light/types';
import GameObject from '../game-object';
import SceneHierarchy from '../scene-hierarchy';

export default class DefaultEntities {
	static add3dObject(
		hierarchy: SceneHierarchy,
		geometry: Geometry,
		type: string,
		parent?: GameObject
	) {
		const gameObject = new GameObject({ displayName: type });
		gameObject.addMesh(geometry);

		if (parent) {
			gameObject.setParent(parent);
		}

		hierarchy.addObject(gameObject);
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
	}

	static addPointLight(hierarchy: SceneHierarchy, parent?: GameObject) {
		const gameObject = new GameObject({ displayName: 'Point Light' });
		gameObject.addLight({ type: LightType.Point });

		if (parent) {
			gameObject.setParent(parent);
		}

		hierarchy.addObject(gameObject);
	}

	static addDirectionalLight(hierarchy: SceneHierarchy, parent?: GameObject) {
		const gameObject = new GameObject({ displayName: 'Directional Light' });
		gameObject.addLight({ type: LightType.Directional });

		if (parent) {
			gameObject.setParent(parent);
		}

		hierarchy.addObject(gameObject);
	}
}
