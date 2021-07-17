import Box from '../../primitives/box';
import Plane from '../../primitives/plane';
import { IPlaneConfig } from '../../primitives/plane/types';
import Sphere from '../../primitives/sphere';
import { ISphereConfig } from '../../primitives/sphere/types';
import GameObject from '../game-object';
import SceneHierarchy from '../scene-hierarchy';

export function addBox(hierarchy: SceneHierarchy) {
	const box = new GameObject();
	box.addMesh(Box, { size: [1, 1, 1] });
	box.addMaterial();

	hierarchy.addObject(box);
}

export function addPlane(hierarchy: SceneHierarchy) {
	const plane = new GameObject();
	plane.addMesh(Plane, {
		width: 500,
		length: 500,
		widthSegments: 1,
		lengthSegments: 1,
	} as IPlaneConfig);

	plane.addMaterial();

	hierarchy.addObject(plane);
}

export function addSphere(hierarchy: SceneHierarchy) {
	const sphere = new GameObject();

	sphere.addMesh(Sphere, {
		widthSegments: 10,
		heightSegments: 10,
		radius: 1,
	} as ISphereConfig);

	sphere.addMaterial();

	hierarchy.addObject(sphere);
}
