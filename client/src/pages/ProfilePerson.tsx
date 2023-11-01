import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../main'

const ProfilePerson: FC = () => {
	const { store } = useContext(Context)
	const navigate = useNavigate()

	async function deleteAccount() {
		await store.deleteAccount()
		navigate('/login')
	}

	return (
		<div className='flex flex-col p-10'>
			<h1 className='text-center text-3xl font-bold mb-3'>{store.user.name}</h1>
			<h2 className=' text-center text-white mb-3'>{store.user.email}</h2>
			{!store.user.isActivated && (
				<p className='text-center mb-3'>Подтвердите аккаунт</p>
			)}
			<button
				className='text-red-500 m-auto bg-white rounded-sm px-2 py-1 hover:text-white hover:bg-red-500'
				onClick={deleteAccount}
			>
				Delete account
			</button>
		</div>
	)
}

export default ProfilePerson
