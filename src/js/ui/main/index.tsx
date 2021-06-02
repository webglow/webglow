import Scene from 'engine/standard/scene';
import GameObject from 'engine/utils/game-object';
import ProjectHierarchy, {
	getTestHierarchy,
} from 'engine/utils/project-hierarchy';
import File from 'engine/utils/project-hierarchy/file';
import SceneHierarchy from 'engine/utils/scene-hierarchy';
import React, { useEffect, useRef, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Engine from '../../engine';
import { useForceUpdate } from '../common/hooks';
import ControlPanel from '../control-panel';
import {
	Canvas,
	StyledSceneHierarchy,
	StyledInspector,
	StyledProjectHierarchy,
	Wrapper,
} from './styles';

const Main = () => {
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

	(window as any).a = projectHierarchy;
	useEffect(() => {
		if (!canvasRef.current || engine) {
			return;
		}

		const _engine = new Engine(canvasRef.current);

		setProjectHierarchy(getTestHierarchy());

		setEngine(_engine);
	}, [canvasRef.current]);

	const openScene = (scene: Scene) => {
		engine.setActiveScene(scene);
		setSceneHierarchy(scene.hierarchy);
		engine.start();
	};

	return (
		<Wrapper>
			<StyledSceneHierarchy
				hierarchy={sceneHierarchy}
				onSelectNode={(node: GameObject) => setSelectedObject(node)}
				selectedObject={selectedObject as GameObject}
			/>
			<ControlPanel
				isRunning={isRunning}
				onPlayPauseClick={() => {
					engine.activeScene.toggleRunning();
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
};

export default hot(Main);
