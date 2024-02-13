import { ISection } from '@app/provider/store/types/project.types'
import useUpload from '@shared/hooks/useUpload'
import { uploadFile } from '@shared/utils/utils'
import { observer } from 'mobx-react-lite'
import { ChangeEvent, useContext, useState } from 'react'
import { MdArchive, MdDelete } from 'react-icons/md'
import { TbDownload } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../../../main'
import Section from './Section'
import SectionModal from './modals/SectionModal'

const NavPageMap = () => {
	const { projectStore } = useContext(Context)

	const navigate = useNavigate()
	const { selectFile } = useUpload()

	// TODO: вынести в стор
	const [editingSection, setEditingSection] = useState<
		ISection | null | object
	>(null)

	async function uploadProjectPreview(e: ChangeEvent<HTMLInputElement>) {
		const file = selectFile(e)
		if (!file) return

		const imgPath = await uploadFile(file)

		await projectStore.assignPreview(projectStore.project.id, imgPath)
	}
	async function deleteProject() {
		const project = projectStore.project

		const agree = confirm('Вы действительно хотите удалить проект?')

		if (agree) {
			projectStore.deleteProjectById(project.id)
			navigate('/projects')
		}
	}

	const openSectionModal = (section?: ISection) => {
		setEditingSection(section ?? {})
	}
	const closeSectionModal = () => setEditingSection(null)

	return (
		<>
			<SectionModal section={editingSection} closeHandler={closeSectionModal} />

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
								onChange={e => uploadProjectPreview(e)}
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

					{projectStore.project.sections?.map(section => (
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
