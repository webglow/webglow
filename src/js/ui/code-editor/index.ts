export default class CodeEditor {
	constructor(text: string, onChange: (newText: string) => void) {
		const editor = window.open(
			`${location.href}editor.html`,
			'',
			'fullscreen=1'
		) as any;
		editor.text = text;
		editor.onCodeSave = (newText: string) => {
			onChange(newText);
		};
	}
}
