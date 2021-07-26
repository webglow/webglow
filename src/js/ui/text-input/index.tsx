import React, { KeyboardEvent, useEffect, useState } from 'react';
import { IProps } from './types';
import { InputComponent } from './styles';

export default function TextInput({
	className,
	type,
	autoFocus,
	value,
	onChange,
}: IProps) {
	const [newValue, setNewValue] = useState(value);

	useEffect(() => {
		setNewValue(value);
	}, [value]);

	const handleKeyPress = (event: KeyboardEvent) => {
		switch (event.code) {
			case 'Enter':
				triggerChange();
				break;
			case 'Escape':
				onChange(value);
				break;
			default:
				break;
		}
	};

	const triggerChange = () => {
		if (newValue !== value) {
			onChange(newValue);
		}
	};

	return (
		<InputComponent
			className={className}
			type={type}
			value={newValue}
			autoFocus={autoFocus}
			onKeyUp={handleKeyPress}
			onBlur={() => triggerChange()}
			onFocus={(event) => event.target.select()}
			onChange={(event) => {
				setNewValue(event.target.value);
			}}
		/>
	);
}
