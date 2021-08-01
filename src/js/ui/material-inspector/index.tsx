import React, { Fragment, useEffect, useState } from 'react';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import {
	ParamControl,
	ParamName,
	ParamsList,
	ParamValue,
	TextParamControl,
	Wrapper,
} from './styles';
import { IMaterialParam } from '../../engine/utils/material/types';
import Checkbox from '../checkbox';
import { UniformType } from '../../engine/utils/shader/types';
import ComponentTitle from '../game-object-inspector/component-title';
import EngineGlobals from '../../engine/globals';
import Material from '../../engine/utils/material';
import { useForceUpdate } from '../common/hooks';

export default function MaterialInspector({ className, file }: IProps) {
	const [material, setMaterial] = useState<Material>();
	const forceUpdate = useForceUpdate();

	useEffect(() => {
		if (!file) {
			return;
		}

		setMaterial(EngineGlobals.materialPool.getMaterialByFileId(file.id));
	}, [file]);

	const updateMaterialParam = (param: { [key: string]: any }, value: any) => {
		material.setParamValue(param.key, value);
		EngineGlobals.materialPool.updateFile(material);

		forceUpdate();
	};

	const getControl = (param: IMaterialParam) => {
		switch (param.type) {
			case UniformType.t_bool:
				return (
					<Checkbox
						checked={param.value}
						onChange={(event) =>
							updateMaterialParam(param, event.target.checked)
						}
					/>
				);
			case UniformType.t_color:
				return (
					<ParamControl
						type="color"
						value={param.value}
						onChange={(event) => updateMaterialParam(param, event.target.value)}
					/>
				);
			default:
				return (
					<TextParamControl
						type="number"
						value={param.value}
						onChange={(newValue) => updateMaterialParam(param, newValue)}
					/>
				);
		}
	};

	if (!material) {
		return null;
	}

	return (
		<Wrapper className={className}>
			<ComponentTitle icon={faTint} title={material.displayName} />
			<ParamsList>
				<Fragment>
					<ParamName>Shader:</ParamName>
					<ParamValue>{material.shader.displayName}</ParamValue>
				</Fragment>

				{material.params.map((param) => (
					<Fragment key={param.key}>
						<ParamName>{param.displayName}:</ParamName>
						{getControl(param)}
					</Fragment>
				))}
			</ParamsList>
		</Wrapper>
	);
}
