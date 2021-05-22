export function getSegment(a, b, c, d) {
	return [...a, ...d, ...c, ...a, ...c, ...b];
}

export function getTextureCoordsForSegment() {
	const a = [0, 0];
	const b = [0, 1];
	const c = [1, 1];
	const d = [1, 0];

	return [...a, ...d, ...c, ...a, ...c, ...b];
}
