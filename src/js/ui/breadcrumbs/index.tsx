import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { IProps } from './types';
import { Breadcrumb, Wrapper, BreadcrumbWrapper } from './styles';
import File from '../../lib/utils/project-hierarchy/file';

export default function Breadcrumbs({ className, cwd, onNavigate }: IProps) {
	const [breadcrumbs, setBreadcrumbs] = useState<File[]>([]);

	useEffect(() => {
		if (!cwd) {
			return;
		}

		setBreadcrumbs(getBreadcrumbs(cwd));
	}, [cwd]);

	const getBreadcrumbs = (file: File): File[] => {
		if (!file.parent) {
			return [file];
		}

		return [...getBreadcrumbs(file.parent), file];
	};

	return (
		<Wrapper className={className}>
			{breadcrumbs.map((br, index) => (
				<BreadcrumbWrapper key={index}>
					<Breadcrumb onClick={() => onNavigate(br)}>{br.name}</Breadcrumb>
					<FontAwesomeIcon icon={faChevronRight} />
				</BreadcrumbWrapper>
			))}
		</Wrapper>
	);
}
