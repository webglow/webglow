export default class Scene {
	constructor(gl) {
		this.gl = gl;
		this.objects = {};
	}

	addObject(name, obj) {
		this.objects[name] = obj;
	}

	getObject(name) {
		return this.objects[name];
	}

	draw() {
		Object.values(this.objects).forEach((obj) => obj.draw());
	}
}
