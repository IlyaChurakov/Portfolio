import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Container from '../../layouts/Container'
import { Context } from '../../main'
import NavPageMap from './components/NavPageMap'

const EditProject = () => {
	const { projectStore } = useContext(Context)
	const { id } = useParams()

	useEffect(() => {
		if (id) {
			projectStore.getProject(id)
		}
	}, [])

	return (
		<div>
			<div>
				{projectStore.project.content?.sections?.map(section => {
					return (
						<section
							key={section.id}
							style={{
								background: `url(${section.background})`,
								padding: section.paddings ?? '2.5rem 0',
							}}
						>
							<Container>
								{section.blocks?.map(block => {
									switch (block.type) {
										case 'h1':
											return (
												<h1
													className={`text-4xl font-bold mb-5`}
													style={{ color: block.color }}
													key={block.id}
												>
													{block.text}
												</h1>
											)
										case 'h2':
											return (
												<h2
													className={`text-xl font-bold`}
													style={{ color: block.color }}
													key={block.id}
												>
													{block.text}
												</h2>
											)
										case 'p':
											return (
												<p
													className='py-2'
													key={block.id}
													style={{ color: block.color }}
												>
													{block.text}
												</p>
											)
										case 'list':
											return (
												<ul
													className='list-disc pl-5'
													key={block.id}
													style={{ color: block.color }}
												>
													{block.items?.map((item, key) => (
														<li key={key}>{item}</li>
													))}
												</ul>
											)
										case 'img':
											console.log(block)
											return (
												<img
													className='w-48 h-48'
													src={`http://localhost:7001/${block.imgPath}`}
													alt='img'
												/>
											)
									}
								})}
							</Container>
						</section>
					)
				})}
			</div>
			<NavPageMap />
		</div>
	)
}

export default observer(EditProject)
