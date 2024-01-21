import {
	IProject,
	ISection,
	SectionInputs,
} from '@app/provider/store/types/project.types'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { MdArchive, MdDelete } from 'react-icons/md'
import { TbDownload } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { Context } from '../../../main'
import useUploadFile from '../../../shared/hooks/useUploadFile'
import SectionModal from '../../../shared/ui/modals/SectionModal'
import Section from '../components/Section'

const NavPageMap = () => {
	const { projectStore } = useContext(Context)
	const { selectFile, file, upload } = useUploadFile()
	const { id } = useParams()
	const navigate = useNavigate()

	const [editingSection, setEditingSection] = useState<
		ISection | null | object
	>(null)

	useEffect(() => {
		if (file) {
			upload(projectStore.project.id)
		}
	}, [file])

	const addSection = (section: ISection) => {
		const project = { ...(projectStore.project as IProject) }

		project.content.sections.push({
			id: uuidv4(),
			name: section.name,
			background: section.background,
			paddings: section.paddings,
		})

		projectStore.setProject(project)
	}
	const editSection = (sectionId: String, data: SectionInputs) => {
		const project = { ...(projectStore.project as IProject) }

		project.content.sections.forEach(section => {
			if (section.id === sectionId) {
				section.name = data.name
				section.background = data.background
				section.paddings = data.paddings
			}
		})

		projectStore.setProject(project)
	}

	const openSectionModal = (section?: ISection) => {
		if (section) {
			setEditingSection(section)
		} else {
			setEditingSection({})
		}
	}
	const closeSectionModal = () => setEditingSection(null)

	const deleteProject = async () => {
		if (id) {
			if (confirm('Вы действительно хотите удалить проект?')) {
				projectStore.deleteProjectById(id)
				navigate('/projects')
			}
		}
	}

	return (
		<>
			<SectionModal
				editSection={editSection}
				addSection={addSection}
				section={editingSection}
				closeHandler={closeSectionModal}
			/>

			<nav className='fixed top-0 right-0 w-[350px] h-screen bg-black p-5 overflow-y-auto flex flex-col'>
				<div className='flex-1'>
					<div className='flex justify-end'>
						<MdDelete
							fill='#C24D51'
							className='mr-1 text-xl'
							title='Удалить проект'
							onClick={deleteProject}
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
						<div key={section.id}>
							<Section
								openHandler={openSectionModal}
								section={section}
								name={section.name}
								blocks={section.blocks || []}
							/>
						</div>
					))}

					<button
						className='bg-gray-600 mb-2 rounded-lg w-full text-gray hover:text-white'
						onClick={() => openSectionModal()}
					>
						Добавить {'<section>'}
					</button>
				</div>
			</nav>
		</>
	)
}

export default observer(NavPageMap)
