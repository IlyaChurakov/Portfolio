import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { IoMdCreate } from 'react-icons/io'
import { RiSave3Fill } from 'react-icons/ri'
import { Context } from '../../main'

interface IDescriptionProps {
	description: string
	onEdit: Function
}

const Description = ({ description, onEdit }: IDescriptionProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editedDescription, setEditedDescription] = useState(description)
	const { store } = useContext(Context)

	const handleEdit = () => {
		setIsEditing(true)
	}

	const handleSave = () => {
		onEdit(editedDescription) // Отправьте изменения на сервер
		setIsEditing(false)
	}

	useEffect(() => {
		setEditedDescription(description)
	}, [description])

	return (
		<div className='grid grid-cols-[25px_1fr] mb-5'>
			{isEditing ? (
				<>
					<button
						className='self-start mt-[3px] h-5 w-5 flex justify-center items-center'
						onClick={handleSave}
					>
						<RiSave3Fill className='hover:text-lg' />
					</button>
					<textarea
						value={editedDescription}
						onChange={e => setEditedDescription(e.target.value)}
						className='w-full'
					/>
				</>
			) : (
				<>
					<button
						className='self-start mt-[3px] h-5 w-5 flex justify-center items-center'
						onClick={handleEdit}
					>
						<IoMdCreate className='hover:text-lg' />
					</button>
					<p className='w-full'>{store.user.description}</p>
				</>
			)}
		</div>
	)
}

export default observer(Description)
