import GameObject from 'engine/utils/game-object';

export default class Behaviour {
	gameObject: GameObject;

	constructor(gameObject: GameObject) {
		this.gameObject = gameObject;
	}

	start() {}
	update() {}
}
