import { IBlock, IProject } from '@app/provider/store/types/project.types'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { MdDelete } from 'react-icons/md'
import { Context } from '../../../main'

const Block = ({
	block,
	openBlockModal,
}: {
	block: IBlock
	openBlockModal: Function
}) => {
	const { projectStore } = useContext(Context)

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
				<div
					className='cursor-pointer text-gray hover:text-white'
					onClick={() => openBlockModal(block)}
				>
					{block.type}
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
