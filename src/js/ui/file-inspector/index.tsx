import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Props } from './types';
import { Content, FileName, Wrapper } from './styles';
import { FileContent } from '../../lib/utils/project-hierarchy/types';
import Script from '../../lib/utils/script';
import { getIconByFileType } from '../helpers';

export default function FileInspector({ className, file }: Props) {
	const formatContent = (content: FileContent) => {
		if (content instanceof Script) {
			return (content as Script).text;
		}
		if (content instanceof Object) {
			return JSON.stringify(content, null, '\t');
		}
	};

	return (
		<Wrapper className={className}>
			<FileName>
				<FontAwesomeIcon icon={getIconByFileType(file.type)} />
				<div>
					{file.name}
					{file.extension}
				</div>
			</FileName>
			<Content>{formatContent(file.content)}</Content>
		</Wrapper>
	);
}
