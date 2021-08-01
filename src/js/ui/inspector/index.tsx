import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import GameObject from 'engine/utils/game-object';
import React from 'react';
import File from '../../engine/utils/project-hierarchy/file';
import { FileType } from '../../engine/utils/project-hierarchy/types';
import GameObjectInspector from '../game-object-inspector';
import MaterialInspector from '../material-inspector';
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
			switch (selectedObject.type) {
				case FileType.Material:
					return <MaterialInspector file={selectedObject} />;
			}
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
