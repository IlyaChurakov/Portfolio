import { useStores } from '@app/provider'
import {
	IBlock,
	ISection,
} from '@app/provider/store/projectStore/types/project.types'
import { RootStore } from '@app/provider/store/rootStore'
import { RootStoreContext } from '@app/provider/store/store'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { BiSolidDownArrow, BiSolidRightArrow } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import BlockEditor from './modals/BlockEditor'

const Section = ({
	section,
	name,
	blocks,
	openHandler,
}: {
	section: ISection
	name: string
	blocks: IBlock[]
	openHandler: Function
}) => {
	const projectStore = useStores(
		RootStoreContext,
		(contextData: RootStore) => contextData,
		(store: RootStore) => store.projectStore
	)

	const [isVisible, setIsVisible] = useState<boolean>(false)
	const openSection = () => setIsVisible(isVisible ? false : true)

	// TODO: вынести в стор
	const [editingBlock, setEditingBlock] = useState<IBlock | null | object>(null)

	const deleteSection = (id: string | number) => {
		const project = { ...projectStore.project }

		project.sections = project.sections.filter(section => section.id !== id)

		projectStore.setProject(project)
	}

	const openBlockModal = (block?: IBlock) => {
		setEditingBlock(block ?? { sectionId: section.id })
	}
	const closeBlockModal = () => setEditingBlock(null)

	return (
		<>
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
							onClick={() => openHandler(section)}
						>
							{name}
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
						{blocks?.map(block => (
							<BlockEditor block={block} />
						))}
						<button
							onClick={() => openBlockModal()}
							className='pl-5 pt-2 hover:bg-gray-500 w-full text-start rounded-lg text-gray hover:text-white'
						>
							Добавить элемент
						</button>

						{/* <BlockModal block={editingBlock} closeHandler={closeBlockModal} /> */}
					</>
				)}
			</div>
		</>
	)
}

export default observer(Section)
