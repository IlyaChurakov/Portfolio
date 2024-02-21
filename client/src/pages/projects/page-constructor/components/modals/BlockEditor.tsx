import { IBlock } from '@app/provider/store/projectStore/types/project.types'
import { useState } from 'react'
import Block from '../Block'
import BlockForm from '../forms/BlockForm'
import Modal from './Modal'

const BlockEditor = ({ block }: { block: IBlock }) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div>
			<Block key={block.id} block={block} onClick={() => setIsOpen(true)} />
			<Modal isOpen={isOpen}>
				<BlockForm block={block} setIsOpen={setIsOpen} />
			</Modal>
		</div>
	)
}

export default BlockEditor
