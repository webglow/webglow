import React, { useEffect, useRef, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Engine from '../../engine';
import GameObject from '../../lib/utils/game-object';
import Hierarchy from '../../lib/utils/hierarchy';
import File from '../../lib/utils/project-hierarchy/file';
import { useForceUpdate } from '../common/hooks';
import ControlPanel from '../control-panel';
import {
	Canvas,
	StyledHierarchy,
	StyledInspector,
	StyledProjectHierarchy,
	Wrapper,
} from './styles';

const Main = () => {
	const canvasRef = useRef();
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [engine, setEngine] = useState<Engine | null>(null);
	const [hierarchy, setHierarchy] = useState<Hierarchy | null>(null);
	const [selectedObject, setSelectedObject] = useState<GameObject | File>(null);
	const forceUpdate = useForceUpdate();

	useEffect(() => {
		if (!canvasRef.current || engine) {
			return;
		}

		const _engine = new Engine(canvasRef.current);

		_engine.start().then(() => {
			setHierarchy(_engine.activeScene.hierarchy);
		});

		setEngine(_engine);
	}, [canvasRef.current]);

	return (
		<Wrapper>
			{hierarchy ? (
				<StyledHierarchy
					hierarchy={hierarchy}
					onSelectNode={(node: GameObject) => setSelectedObject(node)}
					selectedObject={selectedObject as GameObject}
				/>
			) : null}
			<ControlPanel
				isRunning={isRunning}
				onPlayPauseClick={() => {
					engine.activeScene.toggleRunning();
					setIsRunning(!isRunning);
				}}
			/>
			<StyledProjectHierarchy
				selectedObject={selectedObject as File}
				onSelectFile={(file: File) => setSelectedObject(file)}
			/>
			<Canvas ref={canvasRef}></Canvas>
			<StyledInspector
				selectedObject={selectedObject}
				onNameChange={(node, newName) => {
					hierarchy.rename(node, newName);
					forceUpdate();
				}}
			/>
		</Wrapper>
	);
};

export default hot(Main);
