import { useStores } from '@app/index'
import {
	BlockTypes,
	IBlock,
	IProject,
} from '@app/store/projectStore/types/project.types'
import { observer } from 'mobx-react-lite'
import { GoArrowDown, GoArrowUp } from 'react-icons/go'
import { MdDelete } from 'react-icons/md'

const Block = ({
	block,
	openModal,
}: {
	block: IBlock
	openModal: Function
}) => {
	const { projectStore } = useStores()

	const deleteBlock = async (sectionId: string, blockId: string) => {
		const project = { ...(projectStore.project as IProject) }

		const section = project.sections.find(section => section.id === sectionId)
		if (!section) return

		section.blocks?.forEach((block, index) => {
			if (block.id == blockId) {
				section.blocks?.splice(index, 1)
			}
		})

		projectStore.setProject(project)
	}

	const changeOrderUp = (block: IBlock) => {
		const project = { ...projectStore.project }

		const section = project.sections.find(
			section => section.id === block.sectionId
		)
		if (!section) return

		const currentBlockIndex = section.blocks.indexOf(block)
		if (!currentBlockIndex && currentBlockIndex !== 0) return

		const isGlobalFirstBlock: boolean =
			project.sections.indexOf(section) === 0 && currentBlockIndex === 0
		if (isGlobalFirstBlock) return

		const extractedBlock = section.blocks.splice(currentBlockIndex, 1)[0]

		const isToPrevSection = currentBlockIndex - 1 < 0

		if (isToPrevSection) {
			const currentSectionIndex = project.sections.indexOf(section)

			const prevSection = project.sections[currentSectionIndex - 1]
			const prevSectionBlocksLength = prevSection.blocks.length

			extractedBlock.sectionId = prevSection.id
			prevSection.blocks.splice(prevSectionBlocksLength, 0, extractedBlock)
		} else {
			section.blocks.splice(currentBlockIndex - 1, 0, extractedBlock)
		}

		projectStore.setProject({ ...project })
	}

	const changeOrderDown = (block: IBlock) => {
		const project = { ...projectStore.project }

		const section = project.sections.find(
			section => section.id === block.sectionId
		)
		if (!section) return

		const currentBlockIndex = section.blocks.indexOf(block)
		if (!currentBlockIndex && currentBlockIndex !== 0) return

		const sectionsLength = project.sections.length
		const blocksLength = section.blocks.length

		const isGlobalLastBlock: boolean =
			project.sections.indexOf(section) === sectionsLength - 1 &&
			currentBlockIndex === blocksLength - 1
		if (isGlobalLastBlock) return

		const extractedBlock = section.blocks.splice(currentBlockIndex, 1)[0]

		const isToNextSection: boolean = currentBlockIndex + 1 + 1 > blocksLength

		if (isToNextSection) {
			const currentSectionIndex = project.sections.indexOf(section)
			const nextSection = project.sections[currentSectionIndex + 1]

			extractedBlock.sectionId = nextSection.id
			nextSection.blocks.splice(0, 0, extractedBlock)
		} else {
			section.blocks.splice(currentBlockIndex + 1, 0, extractedBlock)
		}

		projectStore.setProject({ ...project })
	}

	return (
		<div>
			<div className='pl-8 pt-2 flex justify-between hover:bg-gray-500 rounded-lg'>
				<div className='flex items-center'>
					<span
						className='cursor-pointer text-gray hover:text-white mr-4'
						onClick={() => openModal(block)}
					>
						{BlockTypes[block.type as keyof typeof BlockTypes]}
					</span>

					<GoArrowUp
						onClick={() => changeOrderUp(block)}
						className='cursor-pointer mr-2 text-xs text-gray hover:text-white'
					/>
					<GoArrowDown
						onClick={() => changeOrderDown(block)}
						className='cursor-pointer mr-2 text-xs text-gray hover:text-white'
					/>
				</div>

				<div
					className='text-red-500 cursor-pointer flex items-center'
					onClick={() => deleteBlock(block.sectionId, block.id)}
				>
					<MdDelete fill='#C24D51' className='mr-1 text-lg' />
				</div>
			</div>
		</div>
	)
}

export default observer(Block)
