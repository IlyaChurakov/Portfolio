import { useState } from 'react'
import { ISection } from '../AddProject'

const Section = ({
	id,
	name,
	background,
	blocks,
	onDeleteSection,
	onDeleteBlock,
	addText,
}: ISection) => {
	const [isVisible, setIsVisible] = useState<boolean>(false)

	return (
		<div>
			<div
				className='flex justify-between'
				onClick={() => setIsVisible(isVisible ? false : true)}
			>
				<div>{name}</div>
				<div className='text-red-500' onClick={() => onDeleteSection(id)}>
					delete section
				</div>
			</div>

			{isVisible && (
				<>
					{blocks?.map(block => {
						return (
							<div className='ml-5 flex justify-between'>
								<div>{block.type}</div>{' '}
								<div
									className='text-red-500'
									onClick={() => onDeleteBlock(id, block.id)}
								>
									delete block
								</div>
							</div>
						)
					})}
					<button onClick={addText}>Добавить text</button>
				</>
			)}
		</div>
	)
}

export default Section
