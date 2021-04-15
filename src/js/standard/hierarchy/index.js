import HierarchyNode from './node';

export default class Hierarchy {
	constructor(rootNodeId) {
		this.rootNode = HierarchyNode.createRootNode(rootNodeId);
		this.rootNodeId = rootNodeId;
		this.nodes = { [rootNodeId]: this.rootNode };
		console.log(this.nodes);
	}

	getNodeById(id) {
		return this.nodes[id];
	}

	getObjectInstance(id) {
		return this.nodes[id].objectInstance;
	}

	createNode(id, objectInstance, parent = this.nodes[this.rootNodeId]) {
		this.nodes[id] = new HierarchyNode(id, objectInstance, false, parent);
	}

	addObject(gameObject, parent = this.nodes[this.rootNodeId]) {
		gameObject.node.parent = parent;
		this.nodes[gameObject.node.id] = gameObject.node;
	}

	setParent(child, parent) {
		child.parent = parent;
	}

	forEachDrawableNode(callback) {
		Object.values(this.nodes)
			.filter((node) => node.objectInstance && node.isDrawable)
			.forEach(callback);
	}

	removeParent(child) {
		child.parent = null;

		delete this.nodes[child.id];
	}
}
