import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faFileCode } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import { Wrapper, ScriptName } from './styles';
import CodeEditor from '../../code-editor';
import ComponentTitle from '../component-title';

export default function ScriptComponent({ className, script }: IProps) {
	return (
		<Wrapper className={className}>
			<ComponentTitle icon={faCode} title="Script" />
			<ScriptName
				onClick={() =>
					new CodeEditor(script.text, (newText) => script.setText(newText))
				}
			>
				<FontAwesomeIcon icon={faFileCode} />
				<div>{script.name}.js</div>
			</ScriptName>
		</Wrapper>
	);
}
