import { useStores } from '@app/index'
import { ISection } from '@app/store/projectStore/types/project.types'
import Section from '@entities/Section'
import Button from '@shared/ui/form/Button'
import ProjectImageForm from '@widgets/forms/ProjectImageForm'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { MdArchive, MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import SectionModal from '../features/modals/SectionModal'

const NavPageMap = () => {
	const { projectStore } = useStores()
	const navigate = useNavigate()

	const [editingSection, setEditingSection] = useState<ISection | null>(null)

	async function deleteProject() {
		const project = projectStore.project

		const agree = confirm('Вы действительно хотите удалить проект?')

		if (agree) {
			await projectStore.deleteProjectById(project.id)
			navigate('/projects')
		}
	}

	const openSectionModal = (section: ISection) => setEditingSection(section)
	const closeSectionModal = () => setEditingSection(null)

	return (
		<>
			<SectionModal section={editingSection} close={closeSectionModal} />

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
						text='Добавить секцию'
						onClick={() => openSectionModal({} as ISection)}
					/>
				</div>
			</nav>
		</>
	)
}

export default observer(NavPageMap)
