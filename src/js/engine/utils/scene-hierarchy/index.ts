import GameObject from 'engine/utils/game-object';
import { IGameObjectJSON } from 'engine/utils/game-object/types';
import { v4 as uuidv4 } from 'uuid';

export default class SceneHierarchy {
	root: GameObject;
	rootId: string;
	nodes: { [key: string]: GameObject };
	nodesArray: GameObject[];

	constructor(rootId: string = 'root', root?: GameObject) {
		this.root = root || this.createRoot();
		this.rootId = rootId;
		this.nodes = { [rootId]: this.root };
		this.nodesArray = [this.root];
	}

	toJSON(): IGameObjectJSON {
		return this.root.toJSON();
	}

	static fromJSON(root: IGameObjectJSON): SceneHierarchy {
		const rootNode = GameObject.fromJSON(root);
		const hierarchy = new SceneHierarchy('root', rootNode);

		const flattenHierarchy = ({ children }: GameObject) => {
			children.forEach((child: GameObject) => {
				hierarchy.nodes[child.id] = child;
				hierarchy.nodesArray.push(child);

				flattenHierarchy(child);
			});
		};

		flattenHierarchy(rootNode);

		return hierarchy;
	}

	createRoot() {
		return new GameObject({ isRoot: true });
	}

	getNode(id: string) {
		return this.nodes[id];
	}

	addObject(node: GameObject, id = uuidv4()) {
		if (!node.parent) {
			node.setParent(this.nodes[this.rootId]);
		}

		this.nodes[id] = node;
		this.nodesArray.push(node);
		node.id = id;

		node.children.forEach((_node) => {
			this.addObject(_node);
		});

		return id;
	}

	forEachDrawableNode(callback: (node: GameObject) => void) {
		this.nodesArray
			.filter((gameObject) => gameObject.material && gameObject.mesh)
			.forEach(callback);
	}

	forEachMaterialNode(callback: (node: GameObject) => void) {
		this.nodesArray
			.filter((gameObject) => gameObject.material)
			.forEach(callback);
	}

	forEachPhysicsNode(callback: (node: GameObject) => void) {
		this.nodesArray
			.filter((gameObject) => gameObject.rigidBody)
			.forEach(callback);
	}

	forEachScriptedNode(callback: (node: GameObject) => void) {
		this.nodesArray
			.filter((gameObject) => gameObject.scripts.length > 0)
			.forEach(callback);
	}

	rename(node: GameObject, newId: string) {
		if (this.nodes[newId]) {
			newId = `${newId} (${uuidv4()})`;
		}

		delete this.nodes[node.id];
		node.id = newId;
		this.nodes[newId] = node;
	}

	removeParent(id: string) {
		this.nodes[id].parent = null;

		this.nodesArray.splice(this.nodesArray.indexOf(this.nodes[id]), 1);

		delete this.nodes[id];
	}

	removeNode(node: GameObject, clearParent: boolean = true) {
		if (node.children) {
			node.children.forEach((child) => this.removeNode(child, false));
		}

		if (node.parent && clearParent) {
			node.parent.children.splice(node.parent.children.indexOf(node), 1);
		}

		this.nodesArray.splice(this.nodesArray.indexOf(node), 1);
		delete this.nodes[node.id];
	}
}
