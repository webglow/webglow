import { defaultTabBinding, defaultKeymap } from '@codemirror/commands';
import { javascript } from '@codemirror/lang-javascript';
import {
	highlightSpecialChars,
	drawSelection,
	highlightActiveLine,
	keymap,
	EditorView,
} from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { history, historyKeymap } from '@codemirror/history';
import { foldGutter, foldKeymap } from '@codemirror/fold';
import { indentOnInput, indentUnit } from '@codemirror/language';
import { lineNumbers } from '@codemirror/gutter';
import { bracketMatching } from '@codemirror/matchbrackets';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/closebrackets';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { commentKeymap } from '@codemirror/comment';
import { rectangularSelection } from '@codemirror/rectangular-selection';
import { lintKeymap } from '@codemirror/lint';
import { defaultHighlightStyle } from '@codemirror/highlight';
import { getDefaultText } from 'engine/utils/script/helpers';
import { darculaHighlightStyle, darculaTheme } from './darcula-theme';

const {
	text = getDefaultText('MyClass'),
	onCodeSave = () => {},
} = window as any;

export const darcula = [darculaTheme, darculaHighlightStyle];

const view = new EditorView({
	state: EditorState.create({
		doc: text,
		extensions: [
			javascript(),
			lineNumbers(),
			highlightSpecialChars(),
			history(),
			foldGutter(),
			indentUnit.of('	'),
			drawSelection(),
			EditorState.allowMultipleSelections.of(true),
			indentOnInput(),
			defaultHighlightStyle.fallback,
			bracketMatching(),
			closeBrackets(),
			autocompletion(),
			rectangularSelection(),
			highlightActiveLine(),
			highlightSelectionMatches(),
			keymap.of([
				defaultTabBinding,
				...closeBracketsKeymap,
				...defaultKeymap,
				...searchKeymap,
				...historyKeymap,
				...foldKeymap,
				...commentKeymap,
				...completionKeymap,
				...lintKeymap,
			]),
			...darcula,
		],
	}),
	parent: document.body,
});

document.addEventListener('keydown', (event: KeyboardEvent) => {
	if (event.code === 'KeyS' && event.ctrlKey) {
		event.preventDefault();

		onCodeSave(view.state.doc.toString());
	}
});
