import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FileContent } from 'engine/utils/project-hierarchy/types';
import Script from 'engine/utils/script';
import { IProps } from './types';
import { Content, FileName, Wrapper } from './styles';
import { getIconByFileType } from '../helpers';

export default function FileInspector({ className, file }: IProps) {
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
