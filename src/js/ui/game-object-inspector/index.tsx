import React, { useEffect, useState } from 'react';
import { ITransformInfo } from 'engine/standard/transform/types';
import Transform from 'engine/standard/transform';
import { IProps } from './types';
import {
	AddComponentButton,
	Section,
	StyledObjectNameEditor,
	Wrapper,
} from './styles';
import { default as TransformUI } from '../transform';
import ScriptSection from '../script-section';

export default function GameObjectInspector({
	className,
	selectedObject,
	onNameChange,
}: IProps) {
	const [transformInfo, setTransformInfo] = useState<ITransformInfo | null>(
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

	const onTransformChange = (
		name: keyof ITransformInfo,
		newValue: [number, number, number]
	) => {
		transform[name] = newValue;
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
			<Section>
				<AddComponentButton>Add Component</AddComponentButton>
			</Section>
		</Wrapper>
	);
}
