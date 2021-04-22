import Box from '../../primitives/box';

export default class SkyBox extends Box {
	constructor(gl, scene, config) {
		super(gl, scene, { ...config, innerFacing: true, enableLighting: false });
	}
}
