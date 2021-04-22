export const NODE_TYPE = {
	NONE: 0,
	DRAWABLE: 1,
	DIRECTIONAL_LIGHT: 2,
	POINT_LIGHT: 3,
};

export default class HierarchyNode {
	constructor(objectInstance, isRoot = false, parent, type = NODE_TYPE.NONE) {
		this.objectInstance = objectInstance;
		this.isRoot = isRoot;
		this.parent = parent;
		this.type = type;
		this.children = [];
	}

	addParent(parent) {
		this.parent = parent;
		parent.children.push(this);
	}
}
