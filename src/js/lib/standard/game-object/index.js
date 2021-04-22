import HierarchyNode, { NODE_TYPE } from '../hierarchy/node';
import Transform from '../transform';

export default class GameObject {
	constructor(nodeType = NODE_TYPE.NONE) {
		this.transform = new Transform();
		this.node = new HierarchyNode(this, false, null, nodeType);
	}
}
