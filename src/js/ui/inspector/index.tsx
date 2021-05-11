import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import Transform from '../../lib/3d/standard/transform';
import { TransformInfo } from '../../lib/3d/standard/transform/types';
import ScriptSection from '../script-section';
import { default as TransformUI } from '../transform';
import { Section, StyledObjectNameEditor, Title, Wrapper } from './styles';
import { Props } from './types';

export default function Inspector({
	className,
	selectedNode,
	onNameChange,
}: Props) {
	if (!selectedNode) {
		return null;
	}

	const [transformInfo, setTransformInfo] = useState<TransformInfo | null>(
		null
	);
	const [transform, setTransform] = useState<Transform | null>(null);
	const [subscriptionId, setSubscriptionId] = useState<string>();

	useEffect(() => {
		if (subscriptionId && transform) {
			transform.unsubscribe(subscriptionId);
			setTransform(null);
			setSubscriptionId('');
		}

		const objectTransform = selectedNode?.gameObject?.transform;

		if (!objectTransform) {
			return;
		}

		setTransformInfo(objectTransform.transform);
		setTransform(objectTransform);

		setSubscriptionId(
			objectTransform.subscribe((info) => {
				setTransformInfo(info);
			})
		);
	}, [selectedNode]);

	const onTransformChange = (newTransform: TransformInfo) => {
		transform.setTransform(newTransform);
	};

	return (
		<Wrapper className={className}>
			<Section>
				<Title>
					<FontAwesomeIcon icon={faInfoCircle} />
					<div>Inspector</div>
				</Title>
				<StyledObjectNameEditor
					name={selectedNode.id}
					onChange={(newName) => onNameChange(selectedNode, newName)}
				/>
			</Section>
			<Section>
				<TransformUI
					transformInfo={transformInfo}
					onChange={onTransformChange}
				/>
			</Section>
			{selectedNode.gameObject.scripts.map((script) => (
				<Section key={script.name}>
					<ScriptSection script={script} />
				</Section>
			))}
		</Wrapper>
	);
}
