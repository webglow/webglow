import Hierarchy from '../hierarchy';

export default class Scene {
	constructor(gl) {
		this.gl = gl;
		this.hierarchy = new Hierarchy('root');
		this.lightSources = {
			directional: [],
			point: [],
		};
	}

	setupLight() {
		this.hierarchy.forEachDrawableNode((node) => {
			node.objectInstance.setupDirectionalLight(this.lightSources.directional);
			node.objectInstance.setupPointLight(this.lightSources.point);
		});
	}

	draw() {
		this.hierarchy.forEachDrawableNode((node) => {
			node.objectInstance.draw();
		});
	}
}
