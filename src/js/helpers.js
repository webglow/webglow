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
	fragmentShader
) {
	const program = gl.createProgram();

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);

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

export function hexToRgb(hex) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	const color = {
		r: parseInt(result[1], 16) / 255,
		g: parseInt(result[2], 16) / 255,
		b: parseInt(result[3], 16) / 255,
	};
	return result
		? {
				rgb: color,
				vec3: [color.r, color.g, color.b],
		  }
		: null;
}
