export default class Editor {
	static spawn(text: string) {
		const editor = window.open(
			`${location.href}/editor.html`,
			'',
			'fullscreen=1'
		) as any;
		editor.text = text;
	}
}
