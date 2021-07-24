import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import { Expand, IconWrapper, Text, Wrapper } from './styles';
import ContextMenu from '../context-menu';
import { pxToRem } from '../../../styles/helpers';

export default function ContextMenuItem({
	className,
	name,
	children,
	icon,
	onClick,
}: IProps) {
	const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);

	return (
		<Wrapper
			className={className}
			onClick={(event: React.MouseEvent) => onClick && onClick(event)}
			onMouseEnter={(event: React.MouseEvent) => {
				setIsSubmenuVisible(true);
			}}
			onMouseLeave={(event: React.MouseEvent) => {
				setIsSubmenuVisible(false);
			}}
		>
			<IconWrapper>
				<FontAwesomeIcon icon={icon} />
			</IconWrapper>
			<Text>{name}</Text>
			{children && (
				<Expand>
					<FontAwesomeIcon icon={faChevronRight} />
				</Expand>
			)}
			{children && (
				<ContextMenu
					items={children}
					visible={isSubmenuVisible}
					style={{
						position: 'absolute',
						top: `-${pxToRem(10)}rem`,
						left: '100%',
					}}
				/>
			)}
		</Wrapper>
	);
}
