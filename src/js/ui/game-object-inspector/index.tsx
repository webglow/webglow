import React, { useEffect, useState } from 'react';
import { ITransformInfo } from 'engine/standard/transform/types';
import Transform from 'engine/standard/transform';
import { IProps } from './types';
import { Section, StyledObjectNameEditor, Wrapper } from './styles';
import TransformComponent from './transform-component';
import ScriptSection from './script-component';
import MeshComponent from './mesh-component';
import LightComponent from './light-component';
import Light from '../../engine/standard/light';
import { LightType } from '../../engine/standard/light/types';
import Color from '../../engine/utils/color';
import { useForceUpdate } from '../common/hooks';
import AddComponent from './add-component';
import { GameObjectComponents } from './add-component/types';
import CameraComponent from './camera-component';
import MaterialComponent from './material-component';

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
	const forceUpdate = useForceUpdate();

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

	const onLightChange = (
		key: keyof Light,
		newValue: number | string | LightType
	) => {
		switch (key) {
			case 'intensity':
				selectedObject.light.intensity = newValue as number;
				break;
			case 'type':
				selectedObject.light.type = newValue as LightType;
				break;
			case 'color':
				selectedObject.light.color = new Color(newValue as string);
				break;
			default:
				console.error('Unsupported light attribute');
				break;
		}

		forceUpdate();
	};

	const onMaterialChange = (key: string, newValue: any) => {
		selectedObject.material.setParamValue(key, newValue);

		forceUpdate();
	};

	const addComponent = (type: GameObjectComponents) => {
		switch (type) {
			case GameObjectComponents.Light:
				selectedObject.addLight();
				break;
			case GameObjectComponents.Mesh:
				break;
			case GameObjectComponents.Camera:
				selectedObject.addCamera();
				break;
			case GameObjectComponents.Script:
				break;
			case GameObjectComponents.Material:
				break;
			default:
				console.error('Unknown component type: ', type);
				break;
		}

		forceUpdate();
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
				<TransformComponent
					transformInfo={transformInfo}
					onChange={onTransformChange}
				/>
			</Section>
			{selectedObject.mesh && (
				<Section>
					<MeshComponent meshName={selectedObject.mesh.geometry.name} />
				</Section>
			)}
			{selectedObject.material && (
				<Section>
					<MaterialComponent
						material={selectedObject.material}
						onParamChange={onMaterialChange}
					/>
				</Section>
			)}
			{selectedObject.light && (
				<Section>
					<LightComponent
						light={selectedObject.light}
						onChange={onLightChange}
					/>
				</Section>
			)}
			{selectedObject.camera && (
				<Section>
					<CameraComponent />
				</Section>
			)}
			{selectedObject.scripts.map((script) => (
				<Section key={script.name}>
					<ScriptSection script={script} />
				</Section>
			))}
			<Section>
				<AddComponent onAddComponent={addComponent} />
			</Section>
		</Wrapper>
	);
}
