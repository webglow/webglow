export default class HierarchyNode {
	constructor(gameObject, isRoot = false, parent) {
		this.gameObject = gameObject;
		this.isRoot = isRoot;
		this.parent = parent;
		this.children = [];
	}

	addParent(parent) {
		this.parent = parent;
		parent.children.push(this);
	}

	setType(type) {
		this.type = type;
	}
}
