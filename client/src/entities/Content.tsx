import { IProject } from '@app/store/projectStore/types/project.types'
import Section from '@shared/layouts/Section'
import Image from '@widgets/blocks/Image'
import Text from '@widgets/blocks/Text'
import Title from '@widgets/blocks/Title'
import { useState } from 'react'
import ImageViewer from '../features/ImageViewer'
import Container from '../shared/layouts/Container'

export const Content = ({ project }: { project: IProject }) => {
	const [imagePath, setImagePath] = useState<string>()

	return (
		<>
			{project.sections?.map(section => (
				<Section key={section.id} section={section}>
					<Container>
						{section.blocks?.map(block => {
							switch (block.type) {
								case 'h1':
									return <Title key={block.id} block={block} />
								case 'p':
									return <Text key={block.id} block={block} />
								case 'img':
									return (
										<Image
											key={block.id}
											block={block}
											onClick={() => setImagePath(block.imgPath ?? undefined)}
										/>
									)
							}
						})}
					</Container>
				</Section>
			))}

			<ImageViewer closeHandler={setImagePath} path={imagePath} />
		</>
	)
}
