import React from 'react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import { Wrapper, MaterialInfo, MaterialInfoKey, MaterialName } from './styles';
import ComponentTitle from '../component-title';

export default function MeshRendererComponent({
	className,
	meshRenderer,
}: IProps) {
	return (
		<Wrapper className={className}>
			<ComponentTitle title={'Mesh Renderer'} icon={faEye} />

			<MaterialInfo>
				<MaterialInfoKey>Material:</MaterialInfoKey>
				<MaterialName>{meshRenderer.material.displayName}</MaterialName>
			</MaterialInfo>
		</Wrapper>
	);
}
