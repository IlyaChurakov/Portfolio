import {
	BlockTypes,
	BlockTypesText,
	IBlock,
	IProject,
	ISection,
	Inputs,
} from '@app/provider/store/types/project.types'
import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { BiSolidDownArrow, BiSolidRightArrow } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import { v4 as uuidv4 } from 'uuid'
import { Context } from '../../../main'
import BlockModal from '../../../shared/ui/modals/BlockModal'

// TODO: вынести типы в types.ts
// TODO: вынести блоки в отдельные компоненты

type StringObject = {
	[key: string]: string
}

interface ISectionProps {
	section: ISection
	name: string
	blocks: IBlock[]
	openHandler: Function
}

type projectData = Inputs & IBlock & { sectionId: string } & { imgPath: string }

const Section = ({ section, name, blocks, openHandler }: ISectionProps) => {
	const { projectStore } = useContext(Context)

	const [isVisible, setIsVisible] = useState<boolean>(false)
	const openSection = () => setIsVisible(isVisible ? false : true)

	const [editingBlock, setEditingBlock] = useState<IBlock | null | object>(null)

	// Сохранение проекта после добавления или редактирования блока
	const editBlock = (data: projectData) => {
		const project: IProject = { ...(projectStore.project as IProject) }

		project.content.sections.forEach(section => {
			if (section.id === data.sectionId) {
				section.blocks?.forEach(block => {
					if (block.id == data.id) {
						block.text = data.text
						block.type =
							BlockTypesText[data.type as keyof typeof BlockTypesText]
						block.color = data.color
						block.imgPath = data.imgPath
						block.imgDescr = data.imgDescr
					}
				})
			}
		})

		projectStore.setProject(project)
	}
	// TODO: возможно перенести в модалку
	const addBlock = (data: projectData) => {
		const project = { ...(projectStore.project as IProject) }

		project.content.sections.forEach(section => {
			if (section.id === data.sectionId) {
				if (section.blocks) {
					section.blocks.push({
						id: uuidv4(),
						type: BlockTypesText[data.type as keyof typeof BlockTypesText],
						text: data.text,
						color: data.color,
						imgPath: data.imgPath,
						imgDescr: data.imgDescr,
					})
				} else {
					section.blocks = []
					section.blocks.push({
						id: uuidv4(),
						type: BlockTypesText[data.type as keyof typeof BlockTypesText],
						text: data.text,
						color: data.color,
						imgPath: data.imgPath,
						imgDescr: data.imgDescr,
					})
				}
			}
		})

		projectStore.setProject(project)
	}
	// TODO: возможно перенести в модалку (тогда кнопка удаления блока будет только в модалке)
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

	const openBlockModal = (block?: IBlock) => {
		if (block) {
			// редактирование блока
			setEditingBlock(block)
		} else {
			// добавление блока
			setEditingBlock({})
		}
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
						{blocks?.map(block => {
							return (
								<div key={block.id}>
									<div className='pl-5 pt-2 flex justify-between hover:bg-gray-500 rounded-lg'>
										<div
											className='cursor-pointer text-gray hover:text-white'
											onClick={() => {
												if (!editingBlock) {
													openBlockModal(block)
												}
											}}
										>
											{block.type}
										</div>
										<div
											className='text-red-500 cursor-pointer flex items-center'
											onClick={() => deleteBlock(section.id, block.id)}
										>
											<MdDelete fill='#C24D51' className='mr-1 text-lg' />
										</div>
									</div>
								</div>
							)
						})}
						<button
							onClick={() => openBlockModal()}
							className='pl-5 pt-2 hover:bg-gray-500 w-full text-start rounded-lg text-gray hover:text-white'
						>
							Добавить элемент
						</button>

						<BlockModal
							sectionId={section.id}
							block={editingBlock}
							closeHandler={closeBlockModal}
							editBlock={editBlock}
							addBlock={addBlock}
							defaultType={BlockTypes.h1}
						/>
					</>
				)}
			</div>
		</>
	)
}

export default observer(Section)
