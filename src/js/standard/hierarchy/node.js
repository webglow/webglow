export default class HierarchyNode {
	constructor(id, objectInstance, isRoot = false, parent, isDrawable = false) {
		this.id = id;
		this.objectInstance = objectInstance;
		this.isRoot = isRoot;
		this.parent = parent;
		this.isDrawable = isDrawable;
	}

	static createRootNode(id) {
		return new HierarchyNode(id, null, true, null);
	}
}
