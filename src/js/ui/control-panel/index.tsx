import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay, faSave } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import { Wrapper, PlayPauseButton, SaveButton } from './styles';

export default function ControlPanel({
	className,
	isRunning,
	onPlayPauseClick,
	onSaveClick,
}: IProps) {
	return (
		<Wrapper className={className}>
			<PlayPauseButton onClick={() => onPlayPauseClick()}>
				{isRunning ? (
					<FontAwesomeIcon icon={faPause} />
				) : (
					<FontAwesomeIcon icon={faPlay} />
				)}
			</PlayPauseButton>
			<SaveButton onClick={() => onSaveClick()}>
				<FontAwesomeIcon icon={faSave} />
				<div>Save</div>
			</SaveButton>
		</Wrapper>
	);
}
