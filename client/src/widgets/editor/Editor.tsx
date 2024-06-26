import { useStores } from '@app/index'
import { ISection } from '@app/store/projectStore/project.types'
import ProjectSavingButton from '@features/ProjectSavingButton'
import { pageTypes } from '@pages/types'
import Button from '@shared/ui/Button'
import Section from '@widgets/editor/Section'
import ProjectImageForm from '@widgets/forms/ProjectImageForm'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { MdArchive, MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import Modal from '../../shared/ui/Modal'
import SectionForm from '../forms/SectionForm'

const Editor = () => {
	const { projectStore } = useStores()
	const navigate = useNavigate()

	const [editingSection, setEditingSection] = useState<ISection | null>(null)

	async function deleteProject() {
		const project = projectStore.project

		const agree = confirm('Вы действительно хотите удалить проект?')
		if (!agree) return

		await projectStore.deleteProjectById(project.id)

		if (project.type === pageTypes.project) navigate('/projects')
		if (project.type === pageTypes.skill) navigate('/skills')
	}

	const openSectionModal = (section: ISection) => setEditingSection(section)
	const closeSectionModal = () => setEditingSection(null)

	const archiveProject = async () => {
		await projectStore.archiveProject(
			projectStore.project.id,
			!projectStore.project.archived
		)
		await projectStore.getProject(projectStore.project.id)
	}

	return (
		<nav className='fixed top-0 right-0 w-[350px] h-screen bg-black p-5 overflow-y-auto flex flex-col'>
			<Modal isOpen={!!editingSection}>
				<SectionForm close={closeSectionModal} section={editingSection} />
			</Modal>

			<div className='flex-1 overflow-y-auto'>
				<div className='flex justify-end'>
					<MdDelete
						fill='#C24D51'
						className='mr-1 text-xl'
						title='Удалить проект'
						onClick={deleteProject}
					/>
					<MdArchive
						fill={
							projectStore.project.archived ? 'rgb(65, 155, 65)' : '#C24D51'
						}
						className='mr-1 text-xl'
						title={
							projectStore.project.archived
								? 'Разархивировать проект'
								: 'Добавить проект в архив'
						}
						onClick={archiveProject}
					/>
				</div>

				<div className='relative w-36 m-auto mb-5 bg-white rounded-lg'>
					<ProjectImageForm />
				</div>

				{projectStore.project.sections?.map(section => (
					<Section
						key={section.id}
						section={section}
						openModal={openSectionModal}
					/>
				))}

				<Button
					className='pl-3 pt-2'
					onClick={() => openSectionModal({} as ISection)}
				>
					Добавить секцию
				</Button>
			</div>

			<div className='w-full flex justify-center pt-2'>
				<ProjectSavingButton />
			</div>
		</nav>
	)
}

export default observer(Editor)
