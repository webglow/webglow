import { ComponentProps } from '../common/types';

export interface Props extends ComponentProps {
	isRunning: boolean;
	onPlayPauseClick: () => void;
}
