import { useStores } from '@app/provider'
import {
	IBlock,
	IProject,
} from '@app/provider/store/projectStore/types/project.types'
import { RootStore } from '@app/provider/store/rootStore'
import { RootStoreContext } from '@app/provider/store/store'
import { observer } from 'mobx-react-lite'
import { MdDelete } from 'react-icons/md'

const Block = ({
	block,
	onClick,
}: // openBlockModal,
{
	block: IBlock
	onClick: Function
	// openBlockModal: Function
}) => {
	const projectStore = useStores(
		RootStoreContext,
		(contextData: RootStore) => contextData,
		(store: RootStore) => store.projectStore
	)

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
					// onClick={() => openBlockModal(block)}
					onClick={() => onClick()}
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
