import { EditorState } from '@codemirror/state';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { lineNumbers } from '@codemirror/gutter';
import { defaultHighlightStyle } from '@codemirror/highlight';

const { text } = window as any;

const view = new EditorView({
	state: EditorState.create({
		doc: text,
		extensions: [javascript(), defaultHighlightStyle, lineNumbers()],
	}),
	parent: document.body,
});
