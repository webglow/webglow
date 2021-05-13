import HierarchyNode from '../hierarchy/node';
import Behaviour from './behaviour';
import { getDefaultText } from './helpers';

export default class Script {
	behaviour: Behaviour;
	name: string;
	className: string;
	text: string;
	node: HierarchyNode;

	constructor(name: string, node: HierarchyNode) {
		this.node = node;
		this.name = name;
		this.className = name.charAt(0).toUpperCase() + name.slice(1);
		this.text = getDefaultText(this.className);
		this.parse();
	}

	parse() {
		this.behaviour = new (new Function(
			'Behaviour',
			`${this.text}; return ${this.className}`
		)(Behaviour))(this.node.gameObject);
		this.behaviour.start();
	}

	setText(newText: string) {
		this.text = newText;
		this.parse();
	}
}
