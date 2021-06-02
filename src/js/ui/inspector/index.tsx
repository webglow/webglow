import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GameObject from 'engine/utils/game-object';
import React from 'react';
import FileInspector from '../file-inspector';
import GameObjectInspector from '../game-object-inspector';
import { Title, Wrapper } from './styles';
import { IProps } from './types';

export default function Inspector({
	className,
	selectedObject,
	onNameChange,
}: IProps) {
	const getInspector = () => {
		if (selectedObject instanceof GameObject) {
			return (
				<GameObjectInspector
					selectedObject={selectedObject as GameObject}
					onNameChange={onNameChange}
				/>
			);
		}
		if (selectedObject instanceof File) {
			return <FileInspector file={selectedObject} />;
		}
		return null;
	};

	return (
		<Wrapper className={className}>
			<Title>
				<FontAwesomeIcon icon={faInfoCircle} />
				<div>Inspector</div>
			</Title>

			{getInspector()}
		</Wrapper>
	);
}
