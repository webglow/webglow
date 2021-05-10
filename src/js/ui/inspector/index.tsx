import React, { useEffect, useState } from 'react';
import Transform from '../../lib/3d/standard/transform';
import { TransformInfo } from '../../lib/3d/standard/transform/types';
import ObjectNameEditor from '../object-name-editor';
import { default as TransformUI } from '../transform';
import { Title, Wrapper } from './styles';
import { Props } from './types';

export default function Inspector({ className, selectedNode }: Props) {
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
			<Title>Inspector</Title>
			<ObjectNameEditor name={selectedNode.id} />
			<TransformUI transformInfo={transformInfo} onChange={onTransformChange} />
		</Wrapper>
	);
}
