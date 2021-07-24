import {
	faCircle,
	faClone,
	faCube,
	faCubes,
	faLightbulb,
	faSquare,
	faSun,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import GameObject from '../../engine/utils/game-object';
import {
	addBox,
	addEmpty,
	addPlane,
	addSphere,
} from '../../engine/utils/helpers/default-shapes';
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
					addBox(hierarchy, parent);
				},
			},
			{
				id: 'add-sphere',
				name: 'Sphere',
				icon: faCircle,
				onClick() {
					addSphere(hierarchy, parent);
				},
			},
			{
				id: 'add-plane',
				name: 'Plane',
				icon: faSquare,
				onClick() {
					addPlane(hierarchy, parent);
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
				onClick() {},
			},
			{
				id: 'add-point',
				name: 'Point',
				icon: faLightbulb,
				onClick() {},
			},
		],
	},
	{
		id: 'add-empty',
		name: 'Add Empty',
		icon: faCubes,
		onClick() {
			addEmpty(hierarchy, parent);
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
