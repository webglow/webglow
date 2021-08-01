import {
	faCircle,
	faClone,
	faCube,
	faCubes,
	faDatabase,
	faExclamationTriangle,
	faLightbulb,
	faSquare,
	faSun,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import DefaultEntities from '../../engine/utils/default-entities';
import GameObject from '../../engine/utils/game-object';
import SceneHierarchy from '../../engine/utils/scene-hierarchy';

export const getObjectMenuItems = (
	hierarchy: SceneHierarchy,
	parent?: GameObject
) => [
	{
		id: '3d-object',
		name: 'Add 3D Object',
		icon: faCubes,
		children: [
			{
				id: 'add-box',
				name: 'Box',
				icon: faCube,
				onClick() {
					DefaultEntities.addBox(hierarchy, parent);
				},
			},
			{
				id: 'add-sphere',
				name: 'Sphere',
				icon: faCircle,
				onClick() {
					DefaultEntities.addSphere(hierarchy, parent);
				},
			},
			{
				id: 'add-plane',
				name: 'Plane',
				icon: faSquare,
				onClick() {
					DefaultEntities.addPlane(hierarchy, parent);
				},
			},
			{
				id: 'add-cylinder',
				name: 'Cylinder',
				icon: faDatabase,
				onClick() {
					DefaultEntities.addCylinder(hierarchy, parent);
				},
			},
			{
				id: 'add-cone',
				name: 'Cone',
				icon: faExclamationTriangle,
				onClick() {
					DefaultEntities.addCone(hierarchy, parent);
				},
			},
		],
	},
	{
		id: 'light',
		name: 'Add Light',
		icon: faLightbulb,
		children: [
			{
				id: 'add-directional',
				name: 'Directional',
				icon: faSun,
				onClick() {
					DefaultEntities.addDirectionalLight(hierarchy, parent);
				},
			},
			{
				id: 'add-point',
				name: 'Point',
				icon: faLightbulb,
				onClick() {
					DefaultEntities.addPointLight(hierarchy, parent);
				},
			},
		],
	},
	{
		id: 'add-empty',
		name: 'Add Empty',
		icon: faCubes,
		onClick() {
			DefaultEntities.addEmpty(hierarchy, parent);
		},
	},
];

export const getGameObjectActionsMenuItems = (
	hierarchy: SceneHierarchy,
	gameObject: GameObject
) => [
	{
		id: 'duplicate',
		name: 'Duplicate',
		icon: faClone,
		onClick() {},
	},
	{
		id: 'remove',
		name: 'Remove',
		icon: faTrash,
		onClick() {
			hierarchy.removeNode(gameObject);
		},
		hasSeparator: true,
	},
];
