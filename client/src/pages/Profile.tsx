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
		<div>
			<h1>{store.user.name}</h1>
			<h2>{store.user.email}</h2>
			{!store.user.isActivated && <p>Подтвердите аккаунт</p>}
			<button style={{ color: 'red' }} onClick={deleteAccount}>
				Delete account
			</button>
		</div>
	)
}

export default observer(Profile)
