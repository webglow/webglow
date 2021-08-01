import { IComponentProps } from '../../common/types';

export interface IProps extends IComponentProps {
	onAddComponent: (type: GameObjectComponents) => void;
}

export enum GameObjectComponents {
	Light,
	Camera,
	Mesh,
	MeshRenderer,
	Script,
}
