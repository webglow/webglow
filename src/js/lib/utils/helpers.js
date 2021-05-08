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
