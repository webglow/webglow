export function getDefaultText(name: string) {
	return `class ${name.charAt(0).toUpperCase() + name.slice(1)} {
	start() {
		// add your init behaviour here
	}

	update() {
		// add your update behaviour here
	}
}`;
}
