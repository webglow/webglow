import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faFileCode } from '@fortawesome/free-solid-svg-icons';
import { Props } from './types';
import { Title, Wrapper, ScriptName } from './styles';
import Editor from '../editor';

export default function ScriptSection({ className, script }: Props) {
	return (
		<Wrapper className={className}>
			<Title>
				<FontAwesomeIcon icon={faCode} />
				<div>Script</div>
			</Title>
			<ScriptName onClick={() => Editor.spawn(script.text)}>
				<FontAwesomeIcon icon={faFileCode} />
				<div>{script.name}.js</div>
			</ScriptName>
		</Wrapper>
	);
}
