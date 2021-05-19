import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faFileCode } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import { Title, Wrapper, ScriptName } from './styles';
import Editor from '../editor';

export default function ScriptSection({ className, script }: IProps) {
	return (
		<Wrapper className={className}>
			<Title>
				<FontAwesomeIcon icon={faCode} />
				<div>Script</div>
			</Title>
			<ScriptName
				onClick={() =>
					new Editor(script.text, (newText) => script.setText(newText))
				}
			>
				<FontAwesomeIcon icon={faFileCode} />
				<div>{script.name}.js</div>
			</ScriptName>
		</Wrapper>
	);
}
