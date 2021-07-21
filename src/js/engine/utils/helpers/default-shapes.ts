import Box from '../../primitives/box';
import Plane from '../../primitives/plane';
import Sphere from '../../primitives/sphere';
import GameObject from '../game-object';
import SceneHierarchy from '../scene-hierarchy';

export function addBox(hierarchy: SceneHierarchy) {
	const box = new GameObject();
	box.addMesh(new Box({ size: [1, 1, 1] }));
	box.addMaterial();

	hierarchy.addObject(box);
}

export function addPlane(hierarchy: SceneHierarchy) {
	const plane = new GameObject();
	plane.addMesh(
		new Plane({
			width: 500,
			length: 500,
			widthSegments: 1,
			lengthSegments: 1,
		})
	);

	plane.addMaterial();

	hierarchy.addObject(plane);
}

export function addSphere(hierarchy: SceneHierarchy) {
	const sphere = new GameObject();

	sphere.addMesh(
		new Sphere({
			widthSegments: 10,
			heightSegments: 10,
			radius: 1,
		})
	);

	sphere.addMaterial();

	hierarchy.addObject(sphere);
}

export function addEmpty(hierarchy: SceneHierarchy) {
	const gameObject = new GameObject();

	hierarchy.addObject(gameObject);
}
