import React from 'react';
import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import { IProps } from './types';
import { Section, StyledObjectNameEditor, Wrapper } from './styles';
import TransformComponent from './transform-component';
import ScriptSection from './script-component';
import MeshComponent from './mesh-component';
import LightComponent from './light-component';
import Light from '../../engine/standard/light';
import { LightType } from '../../engine/standard/light/types';
import Color from '../../engine/utils/color';
import AddComponent from './add-component';
import { GameObjectComponents } from './add-component/types';
import CameraComponent from './camera-component';
import MeshRendererComponent from './mesh-renderer-component';
import EngineGlobals from '../../engine/globals';

const GameObjectInspector = observer(
	({ className, selectedObject, onNameChange }: IProps) => {
		const onTransformChange = (
			name: 'position' | 'eulerRotation' | 'scale',
			newValue: [number, number, number]
		) => {
			runInAction(() => {
				selectedObject.transform[name] = newValue;
			});
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
		};

		const onMaterialChange = (materialId: string) => {
			selectedObject.meshRenderer.material = EngineGlobals.materialPool.getMaterialById(
				materialId
			);
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
				case GameObjectComponents.MeshRenderer:
					break;
				default:
					console.error('Unknown component type: ', type);
					break;
			}
		};

		return (
			<Wrapper className={className}>
				<Section>
					<StyledObjectNameEditor
						name={selectedObject.displayName}
						onChange={(newName) => onNameChange(selectedObject, newName)}
					/>
				</Section>
				<Section>
					<TransformComponent
						transform={selectedObject.transform}
						onChange={onTransformChange}
					/>
				</Section>
				{selectedObject.mesh && (
					<Section>
						<MeshComponent meshName={selectedObject.mesh.geometry.name} />
					</Section>
				)}
				{selectedObject.meshRenderer && (
					<Section>
						<MeshRendererComponent
							meshRenderer={selectedObject.meshRenderer}
							onMaterialChange={onMaterialChange}
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
);

export default GameObjectInspector;
