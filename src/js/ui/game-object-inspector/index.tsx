import React, { useEffect, useState } from 'react';
import { Props } from './types';
import { Section, StyledObjectNameEditor, Wrapper } from './styles';
import { TransformInfo } from '../../lib/3d/standard/transform/types';
import Transform from '../../lib/3d/standard/transform';
import { default as TransformUI } from '../transform';
import ScriptSection from '../script-section';

export default function GameObjectInspector({
	className,
	selectedObject,
	onNameChange,
}: Props) {
	const [transformInfo, setTransformInfo] = useState<TransformInfo | null>(
		null
	);
	const [transform, setTransform] = useState<Transform | null>(null);
	const [subscriptionId, setSubscriptionId] = useState<string>();

	useEffect(() => {
		unsubscribe();
		const objectTransform = selectedObject?.transform;

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

		return () => {
			unsubscribe();
		};
	}, [selectedObject]);

	const unsubscribe = () => {
		if (subscriptionId && transform) {
			transform.unsubscribe(subscriptionId);
			setTransform(null);
			setSubscriptionId('');
		}
	};

	const onTransformChange = (newTransform: TransformInfo) => {
		transform.setTransform(newTransform);
	};

	return (
		<Wrapper className={className}>
			<Section>
				<StyledObjectNameEditor
					name={selectedObject.id}
					onChange={(newName) => onNameChange(selectedObject, newName)}
				/>
			</Section>
			<Section>
				<TransformUI
					transformInfo={transformInfo}
					onChange={onTransformChange}
				/>
			</Section>
			{selectedObject.scripts.map((script) => (
				<Section key={script.name}>
					<ScriptSection script={script} />
				</Section>
			))}
		</Wrapper>
	);
}
