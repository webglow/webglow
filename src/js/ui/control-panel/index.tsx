import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import { Wrapper, PlayPauseButton } from './styles';

export default function ControlPanel({
	className,
	isRunning,
	onPlayPauseClick,
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
		</Wrapper>
	);
}
