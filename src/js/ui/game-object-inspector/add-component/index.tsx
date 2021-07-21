import React, { useEffect, useRef, useState } from 'react';
import {
	faCamera,
	faCode,
	faLightbulb,
	faPalette,
	faTh,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GameObjectComponents, IProps } from './types';
import {
	Wrapper,
	AddComponentButton,
	SelectComponentDropdown,
	DropdownOption,
} from './styles';

export default function AddComponent({ className, onAddComponent }: IProps) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const options = [
		{
			key: GameObjectComponents.Light,
			name: 'Light',
			icon: faLightbulb,
		},
		{
			key: GameObjectComponents.Camera,
			name: 'Camera',
			icon: faCamera,
		},
		{
			key: GameObjectComponents.Mesh,
			name: 'Mesh',
			icon: faTh,
		},
		{
			key: GameObjectComponents.Material,
			name: 'Material',
			icon: faPalette,
		},
		{
			key: GameObjectComponents.Script,
			name: 'Script',
			icon: faCode,
		},
	];
	const wrapperRef = useRef();

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				wrapperRef.current &&
				!(wrapperRef.current as any).contains(event.target)
			) {
				setDropdownOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [wrapperRef.current]);

	return (
		<Wrapper className={className} ref={wrapperRef}>
			<AddComponentButton onClick={() => setDropdownOpen(true)}>
				Add Component
			</AddComponentButton>

			<SelectComponentDropdown hidden={!dropdownOpen}>
				{options.map((option) => (
					<DropdownOption
						key={option.key}
						onClick={() => {
							onAddComponent(option.key);
							setDropdownOpen(false);
						}}
					>
						<FontAwesomeIcon icon={option.icon} />
						<div>{option.name}</div>
					</DropdownOption>
				))}
			</SelectComponentDropdown>
		</Wrapper>
	);
}
