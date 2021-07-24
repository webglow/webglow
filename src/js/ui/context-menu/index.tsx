import React, { Fragment, useEffect, useRef } from 'react';
import { IProps } from './types';
import { Separator, Wrapper } from './styles';
import ContextMenuItem from '../context-menu-item';

export default function ContextMenu({
	className,
	visible = false,
	onOutsideClick,
	items,
	style,
	position,
	onContextMenuItemClick,
}: IProps) {
	const wrapperRef = useRef();

	useEffect(() => {
		if (!onOutsideClick) {
			return;
		}

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
			style={style}
			className={className}
			hidden={!visible}
			position={position}
			ref={wrapperRef}
		>
			{items.map((item) => (
				<Fragment key={item.id}>
					<ContextMenuItem
						name={item.name}
						children={item.children}
						icon={item.icon}
						onClick={(event: React.MouseEvent) => {
							item.onClick && item.onClick(event);
							onContextMenuItemClick && onContextMenuItemClick();
						}}
					/>
					{item.hasSeparator && <Separator />}
				</Fragment>
			))}
		</Wrapper>
	);
}
