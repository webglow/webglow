export default class Scene {
	constructor(gl) {
		this.gl = gl;
		this.objects = {};
		this.lightSources = {
			directional: [],
			point: [],
		};
	}

	addObject(name, obj) {
		this.objects[name] = obj;
	}

	getObject(name) {
		return this.objects[name];
	}

	setupLight() {
		Object.values(this.objects).forEach((obj) => {
			obj.setupDirectionalLight(this.lightSources.directional);
			obj.setupPointLight(this.lightSources.point);
		});
	}

	draw() {
		Object.values(this.objects).forEach((obj) => obj.draw());
	}
}
