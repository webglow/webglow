import Box from '../../primitives/box';
import Plane from '../../primitives/plane';
import Sphere from '../../primitives/sphere';
import GameObject from '../game-object';
import Material from '../material';
import SceneHierarchy from '../scene-hierarchy';

export default class DefaultEntities {
	static addBox(hierarchy: SceneHierarchy, parent?: GameObject) {
		const box = new GameObject();
		box.addMesh(new Box({ size: [1, 1, 1] }));
		box.addMaterial(new Material());

		if (parent) {
			box.setParent(parent);
		}

		hierarchy.addObject(box);
		hierarchy.rename(box, `Box (${box.id})`);
	}

	static addPlane(hierarchy: SceneHierarchy, parent?: GameObject) {
		const plane = new GameObject();
		plane.id = `Plane (${plane.id})`;
		plane.addMesh(
			new Plane({
				width: 50,
				length: 50,
				widthSegments: 1,
				lengthSegments: 1,
			})
		);

		plane.addMaterial(new Material());

		if (parent) {
			plane.setParent(parent);
		}

		hierarchy.addObject(plane);
		hierarchy.rename(plane, `Plane (${plane.id})`);
	}

	static addSphere(hierarchy: SceneHierarchy, parent?: GameObject) {
		const sphere = new GameObject();

		sphere.addMesh(
			new Sphere({
				widthSegments: 30,
				heightSegments: 30,
				radius: 1,
			})
		);

		sphere.addMaterial(new Material());

		if (parent) {
			sphere.setParent(parent);
		}

		hierarchy.addObject(sphere);
		hierarchy.rename(sphere, `Sphere (${sphere.id})`);
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
