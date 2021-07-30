import Box from 'engine/geometry/box';

export default class SkyBox extends Box {
	constructor(gl, scene, config) {
		super(gl, scene, { ...config, innerFacing: true, enableLighting: false });
	}
}
