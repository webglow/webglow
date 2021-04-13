import { vec3 } from 'gl-matrix';

export function getSegment(a, b, c, d) {
	return [...a, ...d, ...c, ...a, ...c, ...b];
}

export function getNormalsForSegment(p00, p01, p10) {
	const n = vec3.normalize(
		vec3.create(),
		vec3.cross(
			vec3.create(),
			vec3.subtract(vec3.create(), p01, p00),
			vec3.subtract(vec3.create(), p10, p00)
		)
	);
	return [...n, ...n, ...n, ...n, ...n, ...n];
}
