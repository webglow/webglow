import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Props } from './types';
import { MenuItem, Wrapper } from './styles';

export default function ContextMenu({
	className,
	visible = false,
	onOutsideClick,
	items,
	position,
}: Props) {
	const wrapperRef = useRef();

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				wrapperRef.current &&
				!(wrapperRef.current as any).contains(event.target)
			) {
				onOutsideClick();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [wrapperRef.current]);

	return (
		<Wrapper
			className={className}
			hidden={!visible}
			position={position}
			ref={wrapperRef}
		>
			{items.map((item) => (
				<MenuItem
					key={item.id}
					onClick={(event: React.MouseEvent) => item.onClick(event)}
				>
					<FontAwesomeIcon icon={item.icon} />
					<div>{item.name}</div>
				</MenuItem>
			))}
		</Wrapper>
	);
}
