import { useStores } from '@app/index'
import {
	BlockTypes,
	IBlock,
	IProject,
} from '@app/store/projectStore/types/project.types'
import { observer } from 'mobx-react-lite'
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

	return (
		<div>
			<div className='pl-5 pt-2 flex justify-between hover:bg-gray-500 rounded-lg'>
				<span
					className='cursor-pointer text-gray hover:text-white'
					onClick={() => openModal(block)}
				>
					{BlockTypes[block.type as keyof typeof BlockTypes]}
				</span>
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
