import { ISection } from '@app/store/projectStore/types/project.types'
import { ReactNode } from 'react'

const defaultSectionPaddings = '2.5rem 0'

const Section = ({
	section,
	children,
}: {
	section: ISection
	children: ReactNode
}) => {
	const getSectionStyles = (section: ISection) => ({
		background: section.backgroundPath
			? `url(${import.meta.env.VITE_API_STATIC_URL}${
					section.backgroundPath
			  }) ` + 'center/cover no-repeat'
			: '',
		padding: section.paddings ?? defaultSectionPaddings,
	})

	return <section style={getSectionStyles(section)}>{children}</section>
}

export default Section
