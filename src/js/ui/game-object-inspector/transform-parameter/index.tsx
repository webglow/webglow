import React, { useEffect, useState } from 'react';
import { IProps } from './types';
import { ParamComponentName, ParamComponentValue, ParamName } from './styles';

export default function TransformParameter({ name, onChange, value }: IProps) {
	const [param, setParam] = useState<
		[string | number, string | number, string | number]
	>([...value]);

	useEffect(() => {
		setParam(value);
	}, [value]);

	const handleSubmit = (event: React.KeyboardEvent) => {
		if (event.code === 'Enter') {
			onChange(
				param.map((p: string) => parseInt(p)) as [number, number, number]
			);
		}
	};

	return (
		<>
			<ParamName>{name}:</ParamName>
			<ParamComponentName>x</ParamComponentName>
			<ParamComponentValue
				type="number"
				onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
					setParam([event.target.value, param[1], param[2]])
				}
				onKeyPress={handleSubmit}
				value={param[0]}
			/>
			<ParamComponentName>y</ParamComponentName>
			<ParamComponentValue
				type="number"
				onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
					setParam([param[0], event.target.value, param[2]])
				}
				onKeyPress={handleSubmit}
				value={param[1]}
			/>
			<ParamComponentName>z</ParamComponentName>
			<ParamComponentValue
				type="number"
				onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
					setParam([param[0], param[1], event.target.value])
				}
				onKeyPress={handleSubmit}
				value={param[2]}
			/>
		</>
	);
}
