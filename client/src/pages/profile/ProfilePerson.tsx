import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect } from 'react'
import { IoMdCreate } from 'react-icons/io'
import { MdPublishedWithChanges } from 'react-icons/md'
import { TbDownload } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import useUploadFile from '../../hooks/useUploadFile'
import { Context } from '../../main'
import { transformDate } from '../../utils/functions'
import Description from './components/Description'

const ProfilePerson: FC = () => {
	const { store } = useContext(Context)
	const navigate = useNavigate()

	const { selectFile, file, upload } = useUploadFile()

	async function deleteAccount() {
		const agree = confirm('Вы действительно хотите удалить свой аккаунт?')
		if (agree) {
			await store.deleteAccount()
			navigate('/login')
		}
	}

	useEffect(() => {
		if (file) {
			upload(+store.user.id, store.uploadAvatar)
		}
	}, [file])

	const handleDescriptionEdit = (editedDescription: string) => {
		if (editedDescription !== store.user.description) {
			store.changeDescription(+store.user.id, editedDescription)
		}
	}

	return (
		<div className='flex flex-col p-10'>
			<div
				className='w-full bg-black p-5 grid grid-cols-[10rem_1fr] gap-10'
				style={{
					boxShadow: '0px 3px 42px -3px rgba(255, 255, 255, 0.1)',
					borderRadius: '10px',
				}}
			>
				<div className='w-40 max-h-60'>
					<div className='relative h-full w-full'>
						<label htmlFor='select_avatar' className='cursor-pointer'>
							<input
								id='select_avatar'
								type='file'
								onChange={e => selectFile(e)}
								className='h-0 w-0 absolute block -z-10 opacity-0'
							/>

							<div className='h-full w-full cursor-pointer rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 hover:opacity-100 flex justify-center items-center hover:bg-black hover:bg-opacity-50'>
								<TbDownload className='text-2xl' />
							</div>

							{store.user.avatar ? (
								<img
									src={`http://localhost:7001/${store.user.avatar}`}
									alt='avatar'
									className='w-full h-full object-cover rounded-lg hover:opacity-30'
								/>
							) : (
								<div className='h-full w-full bg-gray'></div>
							)}
						</label>
					</div>
				</div>
				<div>
					<h1 className='text-start text-3xl text-white font-bold mb-3'>
						{store.user.name}
					</h1>
					<div>
						<Description
							description={store.user.description}
							onEdit={handleDescriptionEdit}
						/>
					</div>
					<h2 className=' text-start text-violet mb-3'>{store.user.email}</h2>

					<p className='flex items-center text-start text-violet mb-3'>
						<MdPublishedWithChanges title='Дата регистрации' className='mr-2' />
						{transformDate(store.user.createdAt)}
					</p>
					<p className='flex items-center text-start text-violet mb-3'>
						<IoMdCreate
							title='Дата последнего изменения профиля'
							className='mr-2'
						/>
						{transformDate(store.user.updatedAt)}
					</p>
					{!store.user.isActivated && (
						<p className='text-start mb-3 text-white'>Подтвердите аккаунт</p>
					)}
					<button
						className='text-white m-auto bg-red rounded-sm px-2 py-1'
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
