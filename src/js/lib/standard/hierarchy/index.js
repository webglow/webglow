import { v4 as uuidv4 } from 'uuid';
import HierarchyNode, { NODE_TYPE } from './node';

export default class Hierarchy {
	constructor(rootNodeId) {
		this.rootNode = this.createRootNode();
		this.rootNodeId = rootNodeId;
		this.nodes = { [rootNodeId]: this.rootNode };
		this.nodesByType = Object.values(NODE_TYPE).reduce(
			(acc, value) => ({
				...acc,
				[value]: [],
			}),
			{}
		);
	}

	createRootNode() {
		return new HierarchyNode(null, true, null);
	}

	getNodeById(id) {
		return this.nodes[id];
	}

	getObjectInstance(id) {
		return this.nodes[id].objectInstance;
	}

	getNodesWithType(nodeType) {
		return this.nodesByType[nodeType];
	}

	addObject(node, id = uuidv4()) {
		if (!node.parent) {
			node.parent = this.nodes[this.rootNodeId];
		}
		this.nodes[id] = node;
		this.nodesByType[node.type].push(node);

		node.children.forEach((_node) => {
			this.addObject(_node);
		});

		return id;
	}

	setParent(child, parent) {
		child.parent = parent;
	}

	forEachDrawableNode(callback) {
		this.getNodesWithType(NODE_TYPE.DRAWABLE).forEach(callback);
	}

	removeParent(id) {
		this.nodes[id].parent = null;

		const nodeTypeArray = this.nodesByType[this.nodes[id].type];
		nodeTypeArray.splice(nodeTypeArray.indexOf(this.nodes[id]), 1);
		delete this.nodes[id];
	}
}
