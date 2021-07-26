import React from 'react';
import { IProps } from './types';
import {
	ParamComponentName,
	ParamComponents,
	ParamComponentValue,
	ParamName,
} from './styles';

export default function TransformParameter({ name, onChange, value }: IProps) {
	return (
		<>
			<ParamName>{name}:</ParamName>
			<ParamComponents>
				<ParamComponentName>x</ParamComponentName>
				<ParamComponentValue
					type="number"
					onChange={(newValue) => {
						onChange([newValue ? parseInt(newValue) : 0, value[1], value[2]]);
					}}
					value={value[0]}
				/>
				<ParamComponentName>y</ParamComponentName>
				<ParamComponentValue
					type="number"
					onChange={(newValue) => {
						onChange([value[0], newValue ? parseInt(newValue) : 0, value[2]]);
					}}
					value={value[1]}
				/>
				<ParamComponentName>z</ParamComponentName>
				<ParamComponentValue
					type="number"
					onChange={(newValue) => {
						onChange([value[0], value[1], newValue ? parseInt(newValue) : 0]);
					}}
					value={value[2]}
				/>
			</ParamComponents>
		</>
	);
}
