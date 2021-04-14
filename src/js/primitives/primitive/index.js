import GameObject from '../../standard/game-object';
import vertexSource from './shaders/vertex.glsl';
import fragmentSource from './shaders/fragment.glsl';

export default class Primitive extends GameObject {
	createProgram(_vertexSource, _fragmentSource) {
		if (_vertexSource || _fragmentSource) {
			super.createProgram(_vertexSource, _fragmentSource);
			return;
		}

		super.createProgram(vertexSource, fragmentSource);
	}
}
