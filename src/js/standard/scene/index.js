export default class Scene {
	constructor(gl) {
		this.gl = gl;
		this.objects = {};
		this.lightSources = {
			directional: [],
		};
	}

	addObject(name, obj) {
		this.objects[name] = obj;
	}

	getObject(name) {
		return this.objects[name];
	}

	setupLight() {
		Object.values(this.objects).forEach((obj) =>
			obj.setupLight(this.lightSources.directional[0].direction)
		);
	}

	draw() {
		Object.values(this.objects).forEach((obj) => obj.draw());
	}
}
