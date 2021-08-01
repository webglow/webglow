import React, { useState } from 'react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import { Wrapper, MaterialInfo, MaterialInfoKey, MaterialName } from './styles';
import ComponentTitle from '../component-title';
import AssignMaterialModal from '../../assign-material-modal';

export default function MeshRendererComponent({
	className,
	meshRenderer,
	onMaterialChange,
}: IProps) {
	const [modalOpen, setModalOpen] = useState(false);

	return (
		<Wrapper className={className}>
			<ComponentTitle title={'Mesh Renderer'} icon={faEye} />

			<MaterialInfo>
				<MaterialInfoKey>Material:</MaterialInfoKey>
				<MaterialName onClick={() => setModalOpen(true)}>
					{meshRenderer.material.displayName}
				</MaterialName>
			</MaterialInfo>

			<AssignMaterialModal
				assignedMaterialId={meshRenderer.material.id}
				open={modalOpen}
				onConfirm={(materialId: string) => {
					setModalOpen(false);

					if (materialId === meshRenderer.material.id) {
						return;
					}

					onMaterialChange(materialId);
				}}
				onClose={() => setModalOpen(false)}
				onCancel={() => setModalOpen(false)}
			/>
		</Wrapper>
	);
}
