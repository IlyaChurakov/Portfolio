import { useStores } from '@app/index'
import { IBlock, ISection } from '@app/store/projectStore/types/project.types'
import Button from '@shared/ui/Button'
import Modal from '@shared/ui/Modal'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { BiSolidDownArrow, BiSolidRightArrow } from 'react-icons/bi'
import { GoArrowDown, GoArrowUp } from 'react-icons/go'
import { MdDelete } from 'react-icons/md'
import Block from './Block'
import BlockForm from './forms/BlockForm'

const Section = ({
	section,
	openModal,
}: {
	section: ISection
	openModal: Function
}) => {
	const { projectStore } = useStores()

	// Управление секцией

	const [isVisible, setIsVisible] = useState<boolean>(false)
	const openSection = () => setIsVisible(isVisible ? false : true)

	const deleteSection = (id: string | number) => {
		const project = { ...projectStore.project }

		project.sections = project.sections.filter(section => section.id !== id)
		projectStore.setProject(project)
	}
	const changeOrderUp = (section: ISection) => {
		const project = { ...projectStore.project }
		const currentSectionIndex = project.sections.indexOf(section)

		const isFirstSection: boolean = currentSectionIndex === 0
		if (isFirstSection) return

		const extractedSection = project.sections.splice(currentSectionIndex, 1)[0]

		project.sections.splice(currentSectionIndex - 1, 0, extractedSection)
		projectStore.setProject({ ...project })
	}
	const changeOrderDown = (section: ISection) => {
		const project = { ...projectStore.project }
		const sectionsLength = project.sections.length
		const currentSectionIndex = project.sections.indexOf(section)

		const isLastSection: boolean = currentSectionIndex === sectionsLength - 1
		if (isLastSection) return

		const extractedSection = project.sections.splice(currentSectionIndex, 1)[0]

		project.sections.splice(currentSectionIndex + 1, 0, extractedSection)
		projectStore.setProject({ ...project })
	}

	// Управление модальным окном

	const [editingBlock, setEditingBlock] = useState<IBlock | null>(null)

	const openBlockModal = (block: IBlock) => setEditingBlock(block)
	const closeBlockModal = () => setEditingBlock(null)

	return (
		<div className='bg-gray-600 mb-2 p-2 border-l-[1px] border-l-gray'>
			<Modal isOpen={!!editingBlock}>
				<BlockForm close={closeBlockModal} block={editingBlock} />
			</Modal>

			<div className='flex justify-between'>
				<div className='flex items-center'>
					{isVisible ? (
						<BiSolidDownArrow
							className='cursor-pointer mr-1 text-xs text-gray hover:text-white'
							onClick={openSection}
						/>
					) : (
						<BiSolidRightArrow
							className='cursor-pointer mr-1 text-xs text-gray hover:text-white'
							onClick={openSection}
						/>
					)}

					<span
						className='cursor-pointer mr-4 text-gray hover:text-white'
						onClick={() => openModal(section)}
					>
						{section.name}
					</span>

					<GoArrowUp
						onClick={() => changeOrderUp(section)}
						className='cursor-pointer mr-2 text-xs text-gray hover:text-white'
					/>
					<GoArrowDown
						onClick={() => changeOrderDown(section)}
						className='cursor-pointer mr-2 text-xs text-gray hover:text-white'
					/>
				</div>

				<div
					className='text-red-500 cursor-pointer flex items-center'
					onClick={() => deleteSection(section.id)}
				>
					<MdDelete fill='#C24D51' className='mr-1 text-lg' />
				</div>
			</div>

			{isVisible && (
				<>
					{section.blocks?.map(block => (
						<Block key={block.id} block={block} openModal={openBlockModal} />
					))}
					<Button
						className='pl-5 pt-2'
						onClick={() => openBlockModal({ sectionId: section.id } as IBlock)}
					>
						Добавить элемент
					</Button>
				</>
			)}
		</div>
	)
}

export default observer(Section)
