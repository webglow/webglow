import { v4 as uuidv4 } from 'uuid';
import HierarchyNode from './node';

export default class Hierarchy {
	rootNode: HierarchyNode;
	rootNodeId: string;
	nodes: { [key: string]: HierarchyNode };
	nodesArray: HierarchyNode[];

	constructor(rootNodeId: string) {
		this.rootNode = this.createRootNode();
		this.rootNodeId = rootNodeId;
		this.nodes = { [rootNodeId]: this.rootNode };
		this.nodesArray = [this.rootNode];
	}

	createRootNode() {
		return new HierarchyNode(null, true, null);
	}

	getNodeById(id: string) {
		return this.nodes[id];
	}

	getGameObject(id: string) {
		return this.nodes[id].gameObject;
	}

	getGameObjectNodes() {
		return this.nodesArray.filter((node) => node.gameObject);
	}

	addObject(node: HierarchyNode, id = uuidv4()) {
		if (!node.parent) {
			node.parent = this.nodes[this.rootNodeId];
		}
		this.nodes[id] = node;
		this.nodesArray.push(node);

		node.children.forEach((_node) => {
			this.addObject(_node);
		});

		return id;
	}

	setParent(child: HierarchyNode, parent: HierarchyNode) {
		child.parent = parent;
	}

	forEachDrawableNode(callback: (node: HierarchyNode) => void) {
		this.nodesArray
			.filter((node) => node.gameObject && node.gameObject.mesh)
			.forEach(callback);
	}

	forEachPhysicsNode(callback: (node: HierarchyNode) => void) {
		this.nodesArray
			.filter((node) => node.gameObject && node.gameObject.rigidBody)
			.forEach(callback);
	}

	removeParent(id: string) {
		this.nodes[id].parent = null;

		this.nodesArray.splice(this.nodesArray.indexOf(this.nodes[id]), 1);

		delete this.nodes[id];
	}

	getComponent() {
	}
}
