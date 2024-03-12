import { IBlock } from '@app/store/projectStore/types/project.types'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import BlockForm from '../../widgets/forms/BlockForm'
import styles from './modal.module.css'

const BlockModal = ({
	block,
	close,
}: {
	block: IBlock | null
	close: () => void
}) => {
	if (!block) return

	return (
		<div
			className={classNames(
				'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black rounded-lg shadow-xl p-5',
				styles.wrapper
			)}
		>
			<BlockForm closeModal={close} block={block} />
		</div>
	)
}

export default observer(BlockModal)
