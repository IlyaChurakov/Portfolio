import { useQuery } from '@tanstack/react-query'
import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect } from 'react'
import { IoMdCreate } from 'react-icons/io'
import { MdPublishedWithChanges } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../main'
import UserService from '../../services/User.service'
import { transformDate } from '../../utils/functions'
import useUploadAvatar from './useUploadAvatar'

const ProfilePerson: FC = () => {
	const { store } = useContext(Context)
	const navigate = useNavigate()

	const { selectFile, file } = useUploadAvatar()

	async function deleteAccount() {
		await store.deleteAccount()
		navigate('/login')
	}

	const uploadAvatar = () => {
		const formData = new FormData()
		formData.append('img', file)

		return formData
	}

	const upload = async (id: number, avatar: FormData) => {
		store.uploadAvatar(id, avatar)
	}

	useEffect(() => {
		if (file) {
			const formData = uploadAvatar()
			upload(+store.user.id, formData)
		}
	}, [file])

	const { data: userAvatar } = useQuery({
		queryKey: ['user avatar'],
		queryFn: () => UserService.getUserAvatar(store.user.avatar),
	})

	return (
		<div className='flex flex-col p-10'>
			<div className='w-full bg-white p-5 grid grid-cols-[7rem_1fr] gap-10 shadow-xl rounded-sm'>
				<div className='w-28 h-48'>
					<img
						src={userAvatar}
						alt='avatar'
						className='w-full h-full object-cover rounded-lg'
					/>

					<input type='file' onChange={e => selectFile(e)} />
				</div>
				<div>
					<h1 className='text-start text-3xl font-bold mb-3'>
						{store.user.name}
					</h1>
					<h2 className=' text-start text-[#D6A47C] mb-3'>
						{store.user.email}
					</h2>
					<p className='flex items-center text-start text-[#D6A47C] mb-3'>
						<MdPublishedWithChanges title='Дата регистрации' className='mr-2' />
						{transformDate(store.user.createdAt)}
					</p>
					<p className='flex items-center text-start text-[#D6A47C] mb-3'>
						<IoMdCreate
							title='Дата последнего изменения профиля'
							className='mr-2'
						/>
						{transformDate(store.user.updatedAt)}
					</p>
					{!store.user.isActivated && (
						<p className='text-start mb-3'>Подтвердите аккаунт</p>
					)}
					<button
						className='text-red-500 m-auto bg-white rounded-sm px-2 py-1 hover:text-white hover:bg-red-500'
						onClick={deleteAccount}
					>
						Delete account
					</button>
				</div>
			</div>
		</div>
	)
}

export default observer(ProfilePerson)
