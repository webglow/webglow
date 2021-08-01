import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IProps } from './types';
import { Content, FileName, Wrapper } from './styles';
import { getIconByFileType } from '../helpers';

export default function FileInspector({ className, file }: IProps) {
	return (
		<Wrapper className={className}>
			<FileName>
				<FontAwesomeIcon icon={getIconByFileType(file.type)} />
				<div>
					{file.name}
					{file.extension}
				</div>
			</FileName>
			<Content>{file.content}</Content>
		</Wrapper>
	);
}
