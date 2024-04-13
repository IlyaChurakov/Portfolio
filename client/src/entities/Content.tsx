import { useStores } from '@app/index'
import Section from '@shared/layouts/Section'
import Centered from '@shared/ui/Centered'
import Image from '@shared/ui/Image'
import PageLoader from '@shared/ui/PageLoader'
import Text from '@shared/ui/Text'
import Title from '@shared/ui/Title'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ImageViewer from '../features/ImageViewer'
import Container from '../shared/layouts/Container'

const Content = () => {
	const { id } = useParams()
	const { projectStore } = useStores()
	const navigate = useNavigate()

	useEffect(() => {
		getProject(id)
	}, [id])

	async function getProject(id: string | null | undefined) {
		if (!id) return

		const project = await projectStore.getProject(id)
		if (!project) navigate('/not-found')
	}

	const [imagePath, setImagePath] = useState<string>()

	if (projectStore.loading)
		return (
			<Centered>
				<PageLoader />
			</Centered>
		)

	if (!projectStore.project) return

	return (
		<>
			{projectStore.project.sections?.map(section => (
				<Section key={section.id} section={section}>
					<Container>
						{section.blocks?.map(block => {
							switch (block.type) {
								case 'h1':
									return (
										<Title
											key={block.id}
											text={block.text!}
											color={block.color}
										/>
									)
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
								case 'list':
									return (
										<ul className='ml-10 my-5' style={{ color: block.color }}>
											{block.items?.map(item => (
												<li>{item}</li>
											))}
										</ul>
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

export default observer(Content)
