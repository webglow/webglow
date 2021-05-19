import React, { useEffect, useState } from 'react';
import { IProps } from './types';
import { Wrapper, Name } from './styles';

export default function ObjectNameEditor({ className, name, onChange }: IProps) {
	const [objectName, setObjectName] = useState<string>(name);

	useEffect(() => {
		setObjectName(name);
	}, [name]);

	return (
		<Wrapper className={className}>
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
