import { EditorView } from '@codemirror/view';
import { HighlightStyle, tags as t } from '@codemirror/highlight';

const orange = 'var(--orange)';
const red = 'var(--red)';
const yellow = 'var(--yellow)';
const blue = 'var(--blue)';
const white = 'var(--white)';
const lightGrey = 'var(--light-grey)';
const green = 'var(--green)';
const purple = 'var(--purple)';
const darkDarkGrey = 'var(--dark-dark-grey)';
const grey = 'var(--grey)';
const darkGrey = 'var(--dark-grey)';

export const darculaTheme = EditorView.theme(
	{
		'&': {
			color: white,
			backgroundColor: darkGrey,
		},

		'.cm-content': {
			caretColor: white,
		},

		'&.cm-focused .cm-cursor': { borderLeftColor: white },
		'&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': {
			backgroundColor: darkDarkGrey,
		},

		'.cm-panels': { backgroundColor: darkDarkGrey, color: white },
		'.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
		'.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },

		'.cm-searchMatch': {
			backgroundColor: '#72a1ff59',
			outline: '1px solid #457dff',
		},
		'.cm-searchMatch.cm-searchMatch-selected': {
			backgroundColor: '#6199ff2f',
		},

		'.cm-activeLine': { backgroundColor: grey },
		'.cm-selectionMatch': { backgroundColor: '#aafe661a' },

		'.cm-matchingBracket': {
			backgroundColor: '#bad0f847',
			outline: '1px solid #515a6b',
			color: blue,
		},
		'.cm-nonmatchingBracket': {
			backgroundColor: '#bad0f847',
			outline: '1px solid #515a6b',
			color: red,
		},

		'.cm-gutters': {
			backgroundColor: darkGrey,
			color: lightGrey,
			border: 'none',
		},

		'.cm-foldPlaceholder': {
			backgroundColor: 'transparent',
			border: 'none',
			color: '#ddd',
		},

		'.cm-tooltip': {
			border: '1px solid #181a1f',
			backgroundColor: darkDarkGrey,
		},
		'.cm-tooltip-autocomplete': {
			'& > ul > li[aria-selected]': {
				backgroundColor: grey,
				color: white,
			},
		},
	},
	{ dark: true }
);

export const darculaHighlightStyle = HighlightStyle.define([
	{ tag: [t.bool], color: purple },
	{
		tag: [t.deleted, t.character, t.propertyName, t.macroName],
		color: yellow,
	},
	{
		tag: [
			t.definition(t.name),
			t.separator,
			t.invalid,
			t.operator,
			t.name,
			t.className,
		],
		color: white,
	},
	{
		tag: [
			t.keyword,
			t.typeName,
			t.changed,
			t.annotation,
			t.modifier,
			t.self,
			t.namespace,
		],
		color: orange,
	},
	{
		tag: [
			t.color,
			t.constant(t.name),
			t.standard(t.name),
			t.function(t.variableName),
			t.labelName,
			t.operatorKeyword,
			t.url,
			t.number,
			t.escape,
			t.regexp,
			t.link,
			t.special(t.string),
			t.atom,
			t.special(t.variableName),
		],
		color: blue,
	},
	{ tag: [t.meta, t.comment], color: lightGrey },
	{ tag: t.strong, fontWeight: 'bold' },
	{ tag: t.emphasis, fontStyle: 'italic' },
	{ tag: t.link, color: lightGrey, textDecoration: 'underline' },
	{ tag: t.heading, fontWeight: 'bold', color: yellow },
	{ tag: [t.processingInstruction, t.string, t.inserted], color: green },
]);
