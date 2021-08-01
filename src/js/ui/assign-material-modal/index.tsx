import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import Modal from '../modal';
import {
	ButtonsContainer,
	CancelButton,
	AssignButton,
	Footer,
	MaterialList,
	MaterialItem,
	MaterialName,
} from './styles';
import EngineGlobals from '../../engine/globals';

export default function AssignMaterialModal({
	className,
	onCancel,
	onClose,
	assignedMaterialId,
	onConfirm,
	open,
}: IProps) {
	const [selectedMaterialId, setSelectedMaterialId] = useState<string>(
		assignedMaterialId
	);

	return (
		<Modal
			className={className}
			open={open}
			onClose={onClose}
			minWidth={500}
			minHeight={400}
			title="Assign material"
			footer={
				<Footer>
					<ButtonsContainer>
						<CancelButton onClick={() => onCancel()}>Cancel</CancelButton>
						<AssignButton
							onClick={() => {
								onConfirm(selectedMaterialId);
							}}
						>
							Assign
						</AssignButton>
					</ButtonsContainer>
				</Footer>
			}
		>
			<MaterialList>
				{EngineGlobals.materialPool.pool.map((item) => (
					<MaterialItem
						key={item.id}
						selected={item.id === selectedMaterialId}
						onClick={() => setSelectedMaterialId(item.id)}
					>
						<FontAwesomeIcon icon={faTint} />
						<MaterialName>{item.material.displayName}</MaterialName>
					</MaterialItem>
				))}
			</MaterialList>
		</Modal>
	);
}
