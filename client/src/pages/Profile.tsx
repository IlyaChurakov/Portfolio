import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../main'

const Profile: FC = () => {
	const { store } = useContext(Context)
	const navigate = useNavigate()

	async function deleteAccount() {
		await store.deleteAccount()
		navigate('/login')
	}

	return (
		<div className='flex flex-col'>
			<h1 className='text-center text-3xl font-bold mb-3'>{store.user.name}</h1>
			<h2 className=' text-center text-gray-400 mb-3'>{store.user.email}</h2>
			{!store.user.isActivated && <p>Подтвердите аккаунт</p>}
			<button className='text-red-500' onClick={deleteAccount}>
				Delete account
			</button>
		</div>
	)
}

export default observer(Profile)
