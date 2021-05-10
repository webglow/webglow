import GameObject from '../game-object';

export default class HierarchyNode {
	gameObject: GameObject;
	isRoot: boolean;
	id: string;
	parent: HierarchyNode;
	children: HierarchyNode[];

	constructor(
		gameObject: GameObject,
		isRoot = false,
		parent: HierarchyNode,
		id?: string
	) {
		this.gameObject = gameObject;
		this.isRoot = isRoot;
		this.parent = parent;
		this.children = [];
		this.id = id;
	}

	addParent(parent: HierarchyNode) {
		this.parent = parent;
		parent.children.push(this);
	}
}
