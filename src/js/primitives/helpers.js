export function getSegment(a, b, c, d) {
	return [...a, ...d, ...c, ...a, ...c, ...b];
}
