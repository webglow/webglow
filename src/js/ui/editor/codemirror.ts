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
import { indentOnInput } from '@codemirror/language';
import { lineNumbers } from '@codemirror/gutter';
import { bracketMatching } from '@codemirror/matchbrackets';
import { closeBrackets, closeBracketsKeymap } from '@codemirror/closebrackets';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { autocompletion, completionKeymap } from '@codemirror/autocomplete';
import { commentKeymap } from '@codemirror/comment';
import { rectangularSelection } from '@codemirror/rectangular-selection';
import { defaultHighlightStyle } from '@codemirror/highlight';
import { lintKeymap } from '@codemirror/lint';

const { text } = window as any;

const view = new EditorView({
	state: EditorState.create({
		doc: text,
		extensions: [
			javascript(),
			defaultHighlightStyle,
			lineNumbers(),
			highlightSpecialChars(),
			history(),
			foldGutter(),
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
		],
	}),
	parent: document.body,
});
