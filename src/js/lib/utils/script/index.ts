import HierarchyNode from '../hierarchy/node';
import { getDefaultText } from './helpers';
import { Behaviour } from './types';

export default class Script {
	behaviour: Behaviour;
	name: string;
	text: string;
	node: HierarchyNode;

	constructor(name: string, node: HierarchyNode) {
		this.node = node;
		this.name = name;
		this.text = getDefaultText(name.charAt(0).toUpperCase() + name.slice(1));
	}

	parse() {
		this.behaviour = eval(`(${this.text})`);
	}
}
