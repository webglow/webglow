export function getDefaultText(className: string) {
	return `class ${className} extends Behaviour {
	start() {
		// add your init behaviour here
	}

	update() {
		// add your update behaviour here
		this.gameObject.transform.rotate([0, 1, 0]);
	}
}`;
}
