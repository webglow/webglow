import React, { useEffect, useState } from 'react';
import { faStickyNote } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import { Wrapper, Name } from './styles';
import ComponentTitle from '../component-title';

export default function ObjectNameEditorComponent({
	className,
	name,
	onChange,
}: IProps) {
	const [objectName, setObjectName] = useState<string>(name);

	useEffect(() => {
		setObjectName(name);
	}, [name]);

	return (
		<Wrapper className={className}>
			<ComponentTitle icon={faStickyNote} title="Name" />

			<Name
				value={objectName}
				onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
					setObjectName(event.target.value)
				}
				onKeyPress={(event: React.KeyboardEvent) => {
					if (event.code === 'Enter') {
						onChange(objectName);
					}
				}}
			/>
		</Wrapper>
	);
}
