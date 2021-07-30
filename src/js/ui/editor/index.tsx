import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { IProps } from './types';
import {
	Canvas,
	CanvasContainer,
	NoActiveCamera,
	StyledControlPanel,
	StyledInspector,
	StyledProjectHierarchy,
	StyledSceneHierarchy,
	Wrapper,
} from './styles';
import { useForceUpdate } from '../common/hooks';
import GameObject from '../../engine/utils/game-object';
import File from '../../engine/utils/project-hierarchy/file';
import ProjectHierarchy, {
	getTestHierarchy,
} from '../../engine/utils/project-hierarchy';
import Engine from '../../engine';
import { ISceneJSON } from '../../engine/standard/scene/types';
import Scene from '../../engine/standard/scene';
import { IProject } from '../project-card/types';
import { API_URL } from '../constants';
import { FileType } from '../../engine/utils/project-hierarchy/types';
import Geometry from '../../engine/standard/geometry';
import Material from '../../engine/utils/material';
import EngineGlobals from '../../engine/globals';
import Model from '../../engine/utils/model';

export default function Editor({ className }: IProps) {
	const canvasRef = useRef();
	const { id } = useParams<{ id: string }>();
	const [cwd, setCwd] = useState<File>(null);

	const [activeCameraPresent, setActiveCameraPresent] = useState(true);
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [sceneFile, setSceneFile] = useState<File>(null);
	const [project, setProject] = useState<IProject>();
	const [engine, setEngine] = useState<Engine | null>(null);
	const [activeScene, setActiveScene] = useState<Scene | null>(null);
	const [projectHierarchy, setProjectHierarchy] = useState<ProjectHierarchy>(
		null
	);
	const [selectedObject, setSelectedObject] = useState<GameObject | File>(null);
	const [selectedFile, setSelectedFile] = useState<File | null>(null);

	const forceUpdate = useForceUpdate();

	useEffect(() => {
		fetch(`${API_URL}projects/${id}`)
			.then((response) => response.json())
			.then((_project) => setProject(_project));
	}, [id]);

	useEffect(() => {
		if (!projectHierarchy) {
			return;
		}

		setCwd(projectHierarchy.root);
	}, [projectHierarchy]);

	useEffect(() => {
		if (!engine) {
			return;
		}

		const scene = (projectHierarchy.root.content as File[]).find(
			(file) => file.type === FileType.Scene
		);

		if (scene) {
			openScene(scene);
		}
	}, [engine]);

	useEffect(() => {
		if (!canvasRef.current || engine || !project) {
			return;
		}

		const _engine = new Engine(canvasRef.current);

		if (project.hierarchy) {
			const hierarchy = ProjectHierarchy.fromJSON(project.hierarchy);

			setProjectHierarchy(hierarchy);
		} else {
			setProjectHierarchy(new ProjectHierarchy());
		}

		setEngine(_engine);

		return () => {
			// TODO: Doesn't work with hot reload. Roll back for production
			// _engine.cleanup();
		};
	}, [canvasRef.current, project]);

	const handleFileDoubleClick = (file: File) => {
		switch (file.type) {
			case FileType.Folder:
				setCwd(file);
				break;
			case FileType.Scene:
				openScene(file);
				break;
			case FileType.Model:
				addModel(file);
				break;
			default:
				break;
		}
	};

	const openScene = (file: File) => {
		const scene = Scene.fromJSON(file.content as ISceneJSON);
		engine.setActiveScene(scene);
		setActiveScene(scene);
		setSceneFile(file);
		engine.start();
	};

	const addModel = (file: File) => {
		const parent = new GameObject();
		const geometries = (file.content as Model).generate();

		geometries.forEach((geometry) => {
			const gameObject = new GameObject({ displayName: geometry.name });

			gameObject.addMesh(geometry);
			gameObject.addMaterial(new Material());

			gameObject.setParent(parent);
		});

		activeScene?.hierarchy.addObject(parent);

		forceUpdate();
	};

	const saveProject = () => {
		if (activeScene) {
			sceneFile.content = activeScene.toJSON();
		}

		const data = JSON.stringify({ hierarchy: projectHierarchy.toJSON() });
		fetch(`${API_URL}projects/${project._id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: data,
		});
	};

	return (
		<Wrapper className={className}>
			<StyledSceneHierarchy
				hierarchy={activeScene?.hierarchy}
				onSelectNode={(node: GameObject) => setSelectedObject(node)}
				selectedObject={selectedObject as GameObject}
			/>

			<StyledControlPanel
				isRunning={isRunning}
				onPlayPauseClick={() => {
					try {
						engine.toggleRunning();
					} catch (e) {
						setActiveCameraPresent(false);
					}
					setIsRunning(!isRunning);
				}}
				onSaveClick={() => {
					saveProject();
				}}
				onTestHierarchyClick={() => {
					const data = JSON.stringify({
						hierarchy: getTestHierarchy().toJSON(),
					});
					fetch(`${API_URL}projects/${project._id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
						},
						body: data,
					});
				}}
			/>

			<StyledProjectHierarchy
				selectedFile={selectedFile}
				cwd={cwd}
				onNavigate={(file: File) => setCwd(file)}
				onFileDoubleClick={handleFileDoubleClick}
				onSelectFile={(file: File) => {
					setSelectedFile(file);
					setSelectedObject(file);
				}}
			/>
			<CanvasContainer>
				<Canvas ref={canvasRef}></Canvas>

				{!activeCameraPresent && isRunning && (
					<NoActiveCamera>No Active Camera</NoActiveCamera>
				)}
			</CanvasContainer>
			<StyledInspector
				selectedObject={selectedObject}
				onNameChange={(node, newName) => {
					node.rename(newName);
					forceUpdate();
				}}
			/>
		</Wrapper>
	);
}
