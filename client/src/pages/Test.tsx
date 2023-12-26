import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const finalSpaceCharacters = [
	{ id: 'gary', name: 'Gary Goodspeed' },
	{ id: 'cato', name: 'Little Cato' },
	{ id: 'kvn', name: 'KVN' },
	{ id: 'mooncake', name: 'Mooncake' },
	{ id: 'quinn', name: 'Quinn Ergon' },
]

export const Test = () => {
	const [characters, setCharacters] = useState(finalSpaceCharacters)

	const handleOnDragEnd = result => {
		console.log('ffff')
		if (!result.destination) return

		const updatedCharacters = Array.from(characters)
		const [reorderedItem] = updatedCharacters.splice(result.source.index, 1)
		updatedCharacters.splice(result.destination.index, 0, reorderedItem)

		setCharacters(updatedCharacters)
	}

	return (
		<div className='flex justify-center items-center h-screen'>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId='characters'>
					{provided => (
						<ul
							className='w-1/3 border border-gray-300 rounded p-4'
							{...provided.droppableProps}
							ref={provided.innerRef}
						>
							{characters.map(({ id, name }, index) => (
								<Draggable key={id} draggableId={id} index={index}>
									{(provided, snapshot) => (
										<li
											className={`bg-white shadow p-4 rounded mb-2 cursor-move ${
												snapshot.isDragging && 'bg-green-100' // пример изменения цвета во время перетаскивания
											}`}
											ref={provided.innerRef}
											{...provided.draggableProps}
											{...provided.dragHandleProps}
										>
											{name}
										</li>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	)
}
