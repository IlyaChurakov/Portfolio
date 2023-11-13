import { useState } from 'react'
import { MdDelete } from 'react-icons/md'
import { ISection } from '../AddProject'

const Section = ({
	id,
	name,
	background,
	blocks,
	onDeleteSection,
	onDeleteBlock,
	addText,
	changeBlock,
}: ISection) => {
	const [isVisible, setIsVisible] = useState<boolean>(false)

	return (
		<div className='bg-gray-600 mb-2 p-2 rounded-lg'>
			<div
				className='flex justify-between '
				onClick={() => setIsVisible(isVisible ? false : true)}
			>
				<div className='cursor-pointer text-white'>{name}</div>
				<div
					className='text-red-500 cursor-pointer flex items-center'
					onClick={() => onDeleteSection(id)}
				>
					<MdDelete fill='#C24D51' className='mr-1 text-lg' />
				</div>
			</div>

			{isVisible && (
				<>
					{blocks?.map(block => {
						return (
							<div
								key={block.id}
								className='pl-5 flex justify-between hover:bg-gray-500 mb-1 rounded-lg'
							>
								<div
									className='cursor-pointer text-white'
									onClick={() => changeBlock(id, block.id, prompt())}
								>
									{block.type}
								</div>
								<div
									className='text-red-500 cursor-pointer flex items-center'
									onClick={() => onDeleteBlock(id, block.id)}
								>
									<MdDelete fill='#C24D51' className='mr-1 text-lg' />
								</div>
							</div>
						)
					})}
					<button
						className='pl-5 hover:bg-gray-500 w-full text-start rounded-lg text-white'
						onClick={addText}
					>
						Добавить {'<p>'}
					</button>
				</>
			)}
		</div>
	)
}

export default Section
