import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { IProps } from './types';
import {
	Canvas,
	StyledControlPanel,
	StyledInspector,
	StyledProjectHierarchy,
	StyledSceneHierarchy,
	Wrapper,
} from './styles';
import { useForceUpdate } from '../common/hooks';
import GameObject from '../../engine/utils/game-object';
import File from '../../engine/utils/project-hierarchy/file';
import ProjectHierarchy from '../../engine/utils/project-hierarchy';
import SceneHierarchy from '../../engine/utils/scene-hierarchy';
import Engine from '../../engine';
import { ISceneJSON } from '../../engine/standard/scene/types';
import Scene from '../../engine/standard/scene';
import { IProject } from '../project-card/types';
import { API_URL } from '../constants';

export default function Editor({ className }: IProps) {
	const canvasRef = useRef();
	const { id } = useParams<{ id: string }>();

	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [project, setProject] = useState<IProject>();
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
		fetch(`${API_URL}projects/${id}`)
			.then((response) => response.json())
			.then((_project) => setProject(_project));
	}, [id]);

	useEffect(() => {
		if (!canvasRef.current || engine || !project) {
			return;
		}

		const _engine = new Engine(canvasRef.current);

		setProjectHierarchy(ProjectHierarchy.fromJSON(project.hierarchy));

		setEngine(_engine);

		return () => {
			_engine.cleanup();
		};
	}, [canvasRef.current, project]);

	const openScene = (sceneData: ISceneJSON) => {
		const scene = Scene.fromJSON(sceneData);
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
