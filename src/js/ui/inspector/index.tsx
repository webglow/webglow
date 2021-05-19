import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import GameObject from '../../lib/utils/game-object';
import File from '../../lib/utils/project-hierarchy/file';
import FileInspector from '../file-inspector';
import GameObjectInspector from '../game-object-inspector';
import { Title, Wrapper } from './styles';
import { Props } from './types';

export default function Inspector({
	className,
	selectedObject,
	onNameChange,
}: Props) {
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
