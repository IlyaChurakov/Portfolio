import { useContext, useEffect } from 'react'
import { MdArchive, MdDelete } from 'react-icons/md'
import { TbDownload } from 'react-icons/tb'
import { v4 as uuidv4 } from 'uuid'
import useUploadFile from '../../../hooks/useUploadFile'
import { Context } from '../../../main'
import { IProject } from '../../../models/IProject'
import Section from '../components/Section'

const NavPageMap = () => {
	const { projectStore } = useContext(Context)
	const { selectFile, file, upload } = useUploadFile()

	useEffect(() => {
		if (file) {
			upload(projectStore.project.id)
		}
	}, [file])

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

	// const addBackground = (id: string, textLink: string | null) => {
	// 	const project = { ...(projectStore.project as IProject) }

	// 	project.content.sections.forEach(section => {
	// 		if (section.id === id) {
	// 			if (textLink) {
	// 				section.background = textLink
	// 			}
	// 			console.log(project)
	// 		}
	// 	})

	// 	projectStore.setProject(project)
	// }

	// const addText = (id: string, text: string | null) => {
	// 	const type = 'p'
	// 	const project = { ...(projectStore.project as IProject) }

	// 	project.content.sections.forEach(section => {
	// 		if (section.id === id) {
	// 			if (section.blocks) {
	// 				section.blocks.push({ id: uuidv4(), type, text: text || '' })
	// 			} else {
	// 				section.blocks = []
	// 				section.blocks.push({ id: uuidv4(), type, text: text || '' })
	// 			}
	// 		}
	// 	})

	// 	projectStore.setProject(project)
	// }
	// const addTitle = (id: string, text: string | null) => {
	// 	const type = 'h1'
	// 	const project = { ...(projectStore.project as IProject) }

	// 	project.content.sections.forEach(section => {
	// 		if (section.id === id) {
	// 			if (section.blocks) {
	// 				section.blocks.push({ id: uuidv4(), type, text: text || '' })
	// 			} else {
	// 				section.blocks = []
	// 				section.blocks.push({ id: uuidv4(), type, text: text || '' })
	// 			}
	// 		}
	// 	})

	// 	projectStore.setProject(project)
	// }

	// const changeBlock = (sectionId: string, blockId: string, text: string) => {
	// 	const project = { ...(projectStore.project as IProject) }

	// 	project.content.sections.forEach(section => {
	// 		if (section.id === sectionId) {
	// 			section.blocks?.forEach(block => {
	// 				if (block.id == blockId) {
	// 					block.text = text
	// 				}
	// 			})
	// 		}
	// 	})

	// 	projectStore.setProject(project)
	// }

	// const deleteSection = (id: string | number) => {
	// 	const project = { ...(projectStore.project as IProject) }

	// 	const newSections = project.content.sections.filter(
	// 		section => section.id !== id
	// 	)

	// 	const newProject = { ...project }
	// 	newProject.content.sections = newSections

	// 	projectStore.setProject(newProject)
	// }

	// const deleteBlock = (sectionId: string, blockId: string) => {
	// 	const project = { ...(projectStore.project as IProject) }

	// 	project.content.sections.forEach(section => {
	// 		if (section.id === sectionId) {
	// 			section.blocks?.forEach((block, index) => {
	// 				if (block.id == blockId) {
	// 					section.blocks?.splice(index, 1)
	// 				}
	// 			})
	// 		}
	// 	})

	// 	projectStore.setProject(project)
	// }

	return (
		<nav className='bg-gray-400 p-5 overflow-y-auto'>
			<div>
				<div className='flex justify-end'>
					<MdDelete
						fill='#C24D51'
						className='mr-1 text-xl'
						title='Удалить проект'
					/>
					<MdArchive
						fill='#C24D51'
						className='mr-1 text-xl'
						title='Добавить проект в архив'
					/>
				</div>

				<div className='relative w-36 h-36 m-auto mb-5 bg-white rounded-lg'>
					<label htmlFor='select_avatar' className='cursor-pointer'>
						<input
							id='select_avatar'
							type='file'
							onChange={e => selectFile(e)}
							className='h-0 w-0 absolute block -z-10 opacity-0'
						/>

						<div className='h-full w-full cursor-pointer rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 hover:opacity-100 flex justify-center items-center hover:bg-black hover:bg-opacity-50 z-50'>
							<TbDownload className='text-2xl' />
						</div>

						{projectStore.project.previewImage ? (
							<img
								src={`http://localhost:7001/${projectStore.project.previewImage}`}
								alt='avatar'
								className='w-full h-full object-cover rounded-lg hover:opacity-30'
							/>
						) : (
							<div className='h-full w-full bg-gray-300 rounded-lg'></div>
						)}

						<div className='absolute bottom-2 left-2 text-white z-40 font-bold'>
							{projectStore.project.name}
						</div>
					</label>
				</div>

				{projectStore.project.content?.sections?.map(section => (
					<Section
						key={section.id}
						id={section.id}
						name={section.name}
						blocks={section.blocks || []}
					/>
				))}

				<button
					className='bg-gray-600 mb-2 rounded-lg w-full text-white'
					onClick={() => addSection(prompt())}
				>
					Добавить {'<section>'}
				</button>
			</div>

			<button onClick={saveProject} className='block m-auto text-white'>
				Сохранить
			</button>
		</nav>
	)
}

export default NavPageMap
