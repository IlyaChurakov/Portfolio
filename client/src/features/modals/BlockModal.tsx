import { IBlock } from '@app/store/projectStore/types/project.types'
import Button from '@shared/ui/form/Button'
import { observer } from 'mobx-react-lite'
import BlockForm from '../../widgets/forms/BlockForm'

const BlockModal = ({
	block,
	close,
}: {
	block: IBlock | null
	close: () => void
}) => {
	if (!block) return

	return (
		<div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black rounded-lg shadow-xl p-5'>
			<div className='flex justify-end'>
				<Button text='Отменить' onClick={close} />
			</div>

			<BlockForm closeModal={close} block={block} />
		</div>
	)
}

export default observer(BlockModal)
