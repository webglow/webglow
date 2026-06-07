import Behaviour from 'engine/utils/script/behaviour';
import GameObject from 'engine/utils/game-object';
import { IScriptJSON } from 'engine/utils/script/types';
import { camelCase, startCase } from 'lodash';
import File from '../project-hierarchy/file';
import EngineGlobals from '../../globals';

export default class Script {
	file: File;
	behaviour: Behaviour;
	gameObject: GameObject;

	constructor(gameObject: GameObject, file: File) {
		this.gameObject = gameObject;
		this.file = file;

		this.parse();
	}

	toJSON(): IScriptJSON {
		return {
			fileId: this.file.id,
		};
	}

	static fromJSON(gameObject: GameObject, { fileId }: IScriptJSON): Script {
		const file = EngineGlobals.projectHierarchy.getFileById(fileId);
		const script = new Script(gameObject, file);

		return script;
	}

	parse() {
		this.behaviour = new (new Function('Behaviour', this.file.content)(
			Behaviour
		))(this.gameObject);
	}
}
