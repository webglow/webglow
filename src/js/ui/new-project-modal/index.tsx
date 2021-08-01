import React, { useState } from 'react';
import { IProps } from './types';
import {
	ButtonsContainer,
	CreateButton,
	Footer,
	CancelButton,
	Form,
	FieldKey,
	StyledInput,
	StyledTextArea,
} from './styles';
import Modal from '../modal';

export default function NewProjectModal({
	className,
	onCancel,
	onCreate,
	onClose,
	open,
}: IProps) {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	return (
		<Modal
			className={className}
			onClose={onClose}
			open={open}
			title="Create New Project"
			footer={
				<Footer>
					<ButtonsContainer>
						<CancelButton onClick={() => onCancel()}>Cancel</CancelButton>
						<CreateButton
							disabled={!name}
							onClick={() => {
								onCreate({
									name,
									description,
								});

								setName('');
								setDescription('');
							}}
						>
							Create
						</CreateButton>
					</ButtonsContainer>
				</Footer>
			}
		>
			<Form>
				<FieldKey>Name:</FieldKey>
				<StyledInput
					value={name}
					onChange={(event) => setName(event.target.value)}
				/>
				<FieldKey>Description:</FieldKey>
				<StyledTextArea
					value={description}
					onChange={(event) => setDescription(event.target.value)}
				/>
			</Form>
		</Modal>
	);
}
