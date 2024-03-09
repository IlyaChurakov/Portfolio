import { useStores } from '@app/index'
import { IBlock, ISection } from '@app/store/projectStore/types/project.types'
import Button from '@shared/ui/form/Button'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { BiSolidDownArrow, BiSolidRightArrow } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import BlockModal from '../features/modals/BlockModal'
import Block from './Block'

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

	return (
		<>
			<BlockModal block={editingBlock} close={closeBlockModal} />

			<div className='bg-gray-600 mb-2 p-2 border-l-[1px] border-l-gray'>
				<div className='flex justify-between'>
					<div className='cursor-pointer flex items-center'>
						{isVisible ? (
							<BiSolidDownArrow
								className='mr-1 text-xs text-gray hover:text-white'
								onClick={openSection}
							/>
						) : (
							<BiSolidRightArrow
								className='mr-1 text-xs text-gray hover:text-white'
								onClick={openSection}
							/>
						)}

						<span
							className='text-gray hover:text-white'
							onClick={() => openModal(section)}
						>
							{section.name}
						</span>
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
							text='Добавить элемент'
							onClick={() =>
								openBlockModal({ sectionId: section.id } as IBlock)
							}
						/>
					</>
				)}
			</div>
		</>
	)
}

export default observer(Section)
