import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Container from '../../layouts/Container'
import { Context } from '../../main'
import { IProject } from '../../models/IProject'
import Section from './components/Section'

const EditProject = () => {
	const { projectStore } = useContext(Context)
	const { id } = useParams()

	useEffect(() => {
		if (id) {
			projectStore.getProject(id)
		}
	}, [])

	const saveProject = () => {
		projectStore.saveProject()
	}

	const addSection = (name: string | null) => {
		if (typeof name == 'string') {
			const project = { ...(projectStore.project as IProject) }
			console.log(project)
			project.content.sections.push({
				id: uuidv4(),
				name,
			})
			console.log(project)

			projectStore.setProject(project)
		}
	}

	const addText = (id: string, text: string | null) => {
		const type = 'p'
		const project = { ...(projectStore.project as IProject) }

		project.content.sections.forEach(section => {
			if (section.id === id) {
				if (section.blocks) {
					section.blocks.push({ id: uuidv4(), type, text: text || '' })
				} else {
					section.blocks = []
					section.blocks.push({ id: uuidv4(), type, text: text || '' })
				}
			}
		})

		projectStore.setProject(project)
	}

	const deleteSection = (id: string | number) => {
		const project = { ...(projectStore.project as IProject) }

		const newSections = project.content.sections.filter(
			section => section.id !== id
		)

		const newProject = { ...project }
		newProject.content.sections = newSections

		projectStore.setProject(newProject)
	}

	const changeBlock = (sectionId: string, blockId: string, text: string) => {
		const project = { ...(projectStore.project as IProject) }

		project.content.sections.forEach(section => {
			if (section.id === sectionId) {
				section.blocks?.forEach(block => {
					if (block.id == blockId) {
						block.text = text
					}
				})
			}
		})

		projectStore.setProject(project)
	}

	const deleteBlock = (sectionId: string, blockId: string) => {
		const project = { ...(projectStore.project as IProject) }

		project.content.sections.forEach(section => {
			if (section.id === sectionId) {
				section.blocks?.forEach((block, index) => {
					if (block.id == blockId) {
						section.blocks?.splice(index, 1)
					}
				})
			}
		})

		projectStore.setProject(project)
	}

	return (
		<div className='grid grid-cols-[1fr_350px]'>
			<div>
				{projectStore.project.content?.sections?.map(section => {
					return (
						<section
							key={section.id}
							className={`py-10 bg-[${section.background}]`}
						>
							<Container>
								{section.blocks?.map(block => {
									if (block.type == 'h1') {
										return (
											<h1
												className={`text-[${block.color}] text-4xl font-bold mb-5`}
												key={block.id}
											>
												{block.text}
											</h1>
										)
									} else if (block.type == 'h2') {
										return (
											<h2
												className={`text-[${block.color}] text-xl font-bold`}
												key={block.id}
											>
												{block.text}
											</h2>
										)
									} else if (block.type == 'p') {
										return (
											<p className='py-2' key={block.id}>
												{block.text}
											</p>
										)
									} else if (block.type == 'list') {
										return (
											<ul className='list-disc pl-5' key={block.id}>
												{block.items?.map((item, key) => (
													<li key={key}>{item}</li>
												))}
											</ul>
										)
									}
								})}
							</Container>
						</section>
					)
				})}
			</div>
			<nav className='bg-gray-400 p-5'>
				<div>
					<button type='button' onClick={() => addSection(prompt())}>
						Добавить {'<section>'}
					</button>

					<div className='w-full h-[2px] bg-black'></div>

					{projectStore.project.content?.sections?.map(section => (
						<Section
							id={section.id}
							onDeleteSection={deleteSection}
							onDeleteBlock={deleteBlock}
							name={section.name}
							blocks={section.blocks}
							addText={() => addText(section.id, prompt())}
							changeBlock={changeBlock}
							key={section.id}
						/>
					))}
				</div>

				<button onClick={saveProject} className='block m-auto'>
					Сохранить
				</button>
			</nav>
		</div>
	)
}

export default observer(EditProject)
