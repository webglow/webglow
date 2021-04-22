export function getSegment(a, b, c, d, cw = false) {
	return cw
		? [...a, ...c, ...d, ...a, ...b, ...c]
		: [...a, ...d, ...c, ...a, ...c, ...b];
}

export function getTextureCoordsForSegment(cw = false) {
	const a = [0, 0];
	const b = [0, 1];
	const c = [1, 1];
	const d = [1, 0];

	return cw
		? [...a, ...c, ...d, ...a, ...b, ...c]
		: [...a, ...d, ...c, ...a, ...c, ...b];
}
