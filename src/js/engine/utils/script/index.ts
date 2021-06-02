import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import Behaviour from 'engine/utils/script/behaviour';
import GameObject from 'engine/utils/game-object';
import { getDefaultText } from './helpers';

export default class Script {
	behaviour: Behaviour;
	name: string;
	className: string;
	text: string;
	gameObject: GameObject;

	constructor(name: string, behaviour?: Behaviour) {
		this.name = name;
		this.className = upperFirst(camelCase(name));
		this.text = getDefaultText(this.className);
		this.behaviour = behaviour;
	}

	toJSON() {
		return {
			name: this.name,
			className: this.className,
			text: this.text,
		};
	}

	assign(gameObject: GameObject) {
		this.gameObject = gameObject;

		if (!this.behaviour) {
			this.parse();
		}
	}

	parse() {
		this.behaviour = new (new Function(
			'Behaviour',
			`${this.text}; return ${this.className}`
		)(Behaviour))(this.gameObject);
	}

	setText(newText: string) {
		this.text = newText;

		if (this.gameObject) {
			this.parse();
		}
	}
}
