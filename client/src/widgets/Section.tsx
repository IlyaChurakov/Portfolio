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

	const [isVisible, setIsVisible] = useState<boolean>(false)
	const openSection = () => setIsVisible(isVisible ? false : true)

	const [editingBlock, setEditingBlock] = useState<IBlock | null>(null)

	const deleteSection = (id: string | number) => {
		const project = { ...projectStore.project }

		project.sections = project.sections.filter(section => section.id !== id)

		projectStore.setProject(project)
	}

	const openBlockModal = (block: IBlock) => setEditingBlock(block)
	const closeBlockModal = () => setEditingBlock(null)

	const orderUp = (section: ISection) => {
		const project = { ...projectStore.project }
		const index = project.sections.indexOf(section)

		const cut = project.sections.splice(index, 1)[0]

		project.sections.splice(index - 1, 0, cut)

		projectStore.setProject({ ...project })
	}

	const orderDown = (section: ISection) => {
		const project = { ...projectStore.project }
		const index = project.sections.indexOf(section)

		const cut = project.sections.splice(index, 1)[0]

		project.sections.splice(index + 1, 0, cut)

		projectStore.setProject({ ...project })
	}

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
						onClick={() => orderUp(section)}
						className='cursor-pointer mr-2 text-xs text-gray hover:text-white'
					/>
					<GoArrowDown
						onClick={() => orderDown(section)}
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
