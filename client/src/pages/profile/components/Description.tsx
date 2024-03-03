import { useStores } from '@app/provider/store/store'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { IoMdCreate } from 'react-icons/io'
import { RiSave3Fill } from 'react-icons/ri'

interface IDescriptionProps {
	description: string
	onEdit: Function
}

const Description = ({ description, onEdit }: IDescriptionProps) => {
	const { userStore } = useStores()

	const [isEditing, setIsEditing] = useState(false)
	const [editedDescription, setEditedDescription] = useState(description)

	const handleEdit = () => {
		setIsEditing(true)
	}

	const handleSave = () => {
		onEdit(editedDescription)
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
						<RiSave3Fill className='hover:text-lg text-white' />
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
						<IoMdCreate className='hover:text-lg text-white' />
					</button>
					{userStore.user.description ? (
						<p className='w-full text-white' onClick={handleEdit}>
							{userStore.user.description}
						</p>
					) : (
						<p className='w-full text-white' onClick={handleEdit}>
							{'Здесь вы можете рассказать о себе!'}
						</p>
					)}
				</>
			)}
		</div>
	)
}

export default observer(Description)
