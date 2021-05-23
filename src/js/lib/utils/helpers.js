import { quat, vec3 } from 'gl-matrix';

export function createShader(
	/** @type {WebGL2RenderingContext} */ gl,
	type,
	source
) {
	const shader = gl.createShader(type);

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

	if (success) {
		return shader;
	}

	console.log(gl.getShaderInfoLog(shader));
	gl.deleteShader(shader);
}

export function createProgram(
	/** @type {WebGL2RenderingContext} */ gl,
	vertexShader,
	fragmentShader,
	attribLocations
) {
	const program = gl.createProgram();

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

	if (attribLocations) {
		Object.keys(attribLocations).forEach((key) => {
			gl.bindAttribLocation(program, attribLocations[key], key);
		});
	}

	gl.linkProgram(program);

	const success = gl.getProgramParameter(program, gl.LINK_STATUS);

	if (success) {
		return program;
	}

	console.log(gl.getProgramInfoLog(program));
	gl.deleteProgram(program);
}

export function resizeCanvasToDisplaySize(canvas, multiplier) {
	multiplier = multiplier || 1;
	const width = (canvas.clientWidth * multiplier) | 0;
	const height = (canvas.clientHeight * multiplier) | 0;
	if (canvas.width !== width || canvas.height !== height) {
		canvas.width = width;
		canvas.height = height;
		return true;
	}
	return false;
}

export function getEuler(quaternion) {
	const out = vec3.create();

	const x = quaternion[3];
	const y = quaternion[0];
	const z = quaternion[1];
	const w = quaternion[2];
	const x2 = x * x;
	const y2 = y * y;
	const z2 = z * z;
	const w2 = w * w;
	const unit = x2 + y2 + z2 + w2;
	const test = x * z - w * y;

	if (test > 0.499995 * unit) {
		out[1] = Math.PI / 2;
		out[2] = 2 * Math.atan2(y, x);
		out[0] = 0;
	} else if (test < -0.499995 * unit) {
		out[1] = -Math.PI / 2;
		out[2] = 2 * Math.atan2(y, x);
		out[0] = 0;
	} else {
		out[1] = Math.asin(2 * (x * z - w * y));
		out[2] = Math.atan2(2 * (x * w + y * z), 1 - 2 * (z2 + w2));
		out[0] = Math.atan2(2 * (x * y + z * w), 1 - 2 * (y2 + z2));
	}

	out[0] = (out[0] * 180) / Math.PI;
	out[1] = (out[1] * 180) / Math.PI;
	out[2] = (out[2] * 180) / Math.PI;

	return out;
}
