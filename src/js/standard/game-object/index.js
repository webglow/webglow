import HierarchyNode from '../hierarchy/node';
import Transform from '../transform';

export default class GameObject {
	constructor(name) {
		this.transform = new Transform();
		this.node = new HierarchyNode(name, this, false, null);
	}
}
