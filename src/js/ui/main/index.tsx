import React, { useEffect, useRef, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Engine from '../../engine';
import GameObject from '../../lib/utils/game-object';
import Hierarchy from '../../lib/utils/hierarchy';
import { useForceUpdate } from '../common/hooks';
import ControlPanel from '../control-panel';
import { Canvas, StyledHierarchy, StyledInspector, Wrapper } from './styles';

const Main = () => {
	const canvasRef = useRef();
	const [isRunning, setIsRunning] = useState<boolean>(false);
	const [engine, setEngine] = useState<Engine | null>(null);
	const [hierarchy, setHierarchy] = useState<Hierarchy | null>(null);
	const [selectedNode, setSelectedNode] = useState<GameObject | null>(null);
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
					onSelectNode={(node: GameObject) => setSelectedNode(node)}
					selectedNode={selectedNode}
				/>
			) : null}
			<ControlPanel
				isRunning={isRunning}
				onPlayPauseClick={() => {
					engine.activeScene.toggleRunning();
					setIsRunning(!isRunning);
				}}
			/>
			<Canvas ref={canvasRef}></Canvas>
			<StyledInspector
				selectedNode={selectedNode}
				onNameChange={(node, newName) => {
					hierarchy.rename(node, newName);
					forceUpdate();
				}}
			/>
		</Wrapper>
	);
};

export default hot(Main);
