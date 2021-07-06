import React, { useEffect, useRef, useState } from 'react';
import { IProps } from './types';
import { Canvas, StyledControlPanel, StyledInspector, StyledProjectHierarchy, StyledSceneHierarchy, Wrapper } from './styles';
import { useForceUpdate } from '../common/hooks';
import GameObject from '../../engine/utils/game-object';
import File from '../../engine/utils/project-hierarchy/file';
import ProjectHierarchy, {getTestHierarchy} from '../../engine/utils/project-hierarchy';
import SceneHierarchy from '../../engine/utils/scene-hierarchy';
import Engine from '../../engine';
import {ISceneJSON} from '../../engine/standard/scene/types';
import Scene from '../../engine/standard/scene';

export default function Editor({ className }: IProps) {
	const canvasRef = useRef();
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [engine, setEngine] = useState<Engine | null>(null);
	const [sceneHierarchy, setSceneHierarchy] = useState<SceneHierarchy | null>(
		null
	);
	const [projectHierarchy, setProjectHierarchy] = useState<ProjectHierarchy>(
		null
	);
	const [selectedObject, setSelectedObject] = useState<GameObject | File>(null);
	const forceUpdate = useForceUpdate();

	useEffect(() => {
		if (!canvasRef.current || engine) {
			return;
		}

		const _engine = new Engine(canvasRef.current);

		setProjectHierarchy(ProjectHierarchy.fromJSON(getTestHierarchy().toJSON()));

		setEngine(_engine);
	}, [canvasRef.current]);

	useEffect(() => {
		if (!projectHierarchy) {
			return;
		}

		(window as any).projectHierarchy = projectHierarchy;
		(window as any).ProjectHierarchy = ProjectHierarchy;
		(window as any).sceneHierarchy = sceneHierarchy;
	}, [projectHierarchy, sceneHierarchy]);

	const openScene = (sceneData: ISceneJSON) => {
		const scene = Scene.fromJSON(sceneData);
		scene.setupLight();
		engine.setActiveScene(scene);
		setSceneHierarchy(scene.hierarchy);
		engine.start();
	};

	return (
		<Wrapper className={className}>
			<StyledSceneHierarchy
				hierarchy={sceneHierarchy}
				onSelectNode={(node: GameObject) => setSelectedObject(node)}
				selectedObject={selectedObject as GameObject}
			/>

			<StyledControlPanel
				isRunning={isRunning}
				onPlayPauseClick={() => {
					engine.toggleRunning();
					setIsRunning(!isRunning);
				}}
			/>
			<StyledProjectHierarchy
				selectedObject={selectedObject as File}
				hierarchy={projectHierarchy}
				onOpenScene={openScene}
				onSelectFile={(file: File) => setSelectedObject(file)}
			/>
			<Canvas ref={canvasRef}></Canvas>
			<StyledInspector
				selectedObject={selectedObject}
				onNameChange={(node, newName) => {
					sceneHierarchy.rename(node, newName);
					forceUpdate();
				}}
			/>
		</Wrapper>
	);
}
