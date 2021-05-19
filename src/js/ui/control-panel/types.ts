import { IComponentProps } from '../common/types';

export interface IProps extends IComponentProps {
	isRunning: boolean;
	onPlayPauseClick: () => void;
}
