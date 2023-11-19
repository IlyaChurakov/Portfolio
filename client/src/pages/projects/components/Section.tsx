import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { BiSolidDownArrow, BiSolidRightArrow } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'
import { Context } from '../../../main'
import { IBlock, IProject } from '../../../models/IProject'
import BlockAddModal from './modals/block-add-modal/BlockAddModal'
import BlockEditorModal, {
	Inputs,
} from './modals/block-editor/BlockEditorModal'

interface ISectionProps {
	id: string
	name: string
	blocks: IBlock[]
}

type StringObject = {
	[key: string]: string
}

const textTypes: StringObject = {
	Заголовок: 'h1',
	'Основной текст': 'p',
}

const Section = ({ id, name, blocks }: ISectionProps) => {
	const { projectStore } = useContext(Context)

	const [isVisible, setIsVisible] = useState<boolean>(false)
	const openSection = () => setIsVisible(isVisible ? false : true)

	const [editingBlockId, setEditingBlockId] = useState<string>('')
	const [isVisibleBlockAddModal, setIsVisibleBlockAddModal] =
		useState<boolean>(false)

	const editBlock = (sectionId: string, blockId: string, data: Inputs) => {
		const project = { ...(projectStore.project as IProject) }

		project.content.sections.forEach(section => {
			if (section.id === sectionId) {
				section.blocks?.forEach(block => {
					if (block.id == blockId) {
						block.text = data.text
						block.type = textTypes[data.type]
						block.color = data.color
					}
				})
			}
		})

		projectStore.setProject(project)
	}

	const addBlock = (sectionId: string, data: Inputs) => {
		const project = { ...(projectStore.project as IProject) }

		project.content.sections.forEach(section => {
			if (section.id === sectionId) {
				if (section.blocks) {
					section.blocks.push({
						id: uuidv4(),
						type: textTypes[data.type],
						text: data.text,
						color: data.color,
					})
				} else {
					section.blocks = []
					section.blocks.push({
						id: uuidv4(),
						type: textTypes[data.type],
						text: data.text,
						color: data.color,
					})
				}
			}
		})

		projectStore.setProject(project)
	}

	const deleteBlock = async (sectionId: string, blockId: string) => {
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

	const deleteSection = (id: string | number) => {
		const project = { ...(projectStore.project as IProject) }

		const newSections = project.content.sections.filter(
			section => section.id !== id
		)

		const newProject = { ...project }
		newProject.content.sections = newSections

		projectStore.setProject(newProject)
	}

	// const editSection = (sectionId: string, blockId: string) => {
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

	const openBlockEditorModal = (id: string) => setEditingBlockId(id)
	const closeBlockEditorModal = () => setEditingBlockId('')

	const openBlockAddModal = () => setIsVisibleBlockAddModal(true)
	const closeBlockAddModal = () => setIsVisibleBlockAddModal(false)

	return (
		<>
			<div className='bg-gray-600 mb-2 p-2 rounded-lg'>
				<div className='flex justify-between ' onClick={openSection}>
					<div className='cursor-pointer text-white flex items-center'>
						{isVisible ? (
							<BiSolidDownArrow fill='#fff' className='mr-1 text-xs' />
						) : (
							<BiSolidRightArrow fill='#fff' className='mr-1 text-xs' />
						)}
						{name}
					</div>
					<div
						className='text-red-500 cursor-pointer flex items-center'
						onClick={() => deleteSection(id)}
					>
						<MdDelete fill='#C24D51' className='mr-1 text-lg' />
					</div>
				</div>

				{isVisible && (
					<>
						{blocks?.map(block => {
							return (
								<div key={block.id}>
									<BlockEditorModal
										sectionId={id}
										defaultValues={{
											type: block.type == 'h1' ? 'Заголовок' : 'Основной текст',
											text: block.text || '',
											color: block.color || '#000',
										}}
										blockId={block.id}
										isShow={editingBlockId == block.id}
										closeHandler={closeBlockEditorModal}
										editBlock={editBlock}
									/>

									<div className='pl-5 flex justify-between hover:bg-gray-500 mb-1 rounded-lg'>
										<div
											className='cursor-pointer text-white'
											onClick={() => {
												if (!editingBlockId) {
													openBlockEditorModal(block.id)
												}
											}}
										>
											{block.type}
										</div>
										<div
											className='text-red-500 cursor-pointer flex items-center'
											onClick={() => deleteBlock(id, block.id)}
										>
											<MdDelete fill='#C24D51' className='mr-1 text-lg' />
										</div>
									</div>
								</div>
							)
						})}

						<BlockAddModal
							sectionId={id}
							isVisible={isVisibleBlockAddModal}
							closeHandler={closeBlockAddModal}
							addBlock={addBlock}
						/>

						<button
							onClick={openBlockAddModal}
							className='pl-5 hover:bg-gray-500 w-full text-start rounded-lg text-white'
						>
							Добавить элемент
						</button>
					</>
				)}
			</div>
		</>
	)
}

export default observer(Section)
