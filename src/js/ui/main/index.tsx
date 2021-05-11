import React, { useEffect, useRef, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Engine from '../../engine';
import Hierarchy from '../../lib/utils/hierarchy';
import HierarchyNode from '../../lib/utils/hierarchy/node';
import { Canvas, StyledHierarchy, StyledInspector, Wrapper } from './styles';

const Main = () => {
	const canvasRef = useRef();
	const [engine, setEngine] = useState<Engine | null>(null);
	const [hierarchy, setHierarchy] = useState<Hierarchy | null>(null);
	const [selectedNode, setSelectedNode] = useState<HierarchyNode | null>(null);

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
					onSelectNode={(node: HierarchyNode) => setSelectedNode(node)}
					selectedNode={selectedNode}
				/>
			) : null}
			<Canvas ref={canvasRef}></Canvas>
			<StyledInspector
				selectedNode={selectedNode}
				onNameChange={(node, newName) => {
					hierarchy.rename(node, newName);
					setHierarchy(hierarchy);
				}}
			/>
		</Wrapper>
	);
};

export default hot(Main);
