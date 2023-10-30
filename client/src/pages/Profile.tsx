import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from '../layouts/Container'
import { Context } from '../main'

const Profile: FC = () => {
	const { store } = useContext(Context)
	const navigate = useNavigate()

	async function deleteAccount() {
		await store.deleteAccount()
		navigate('/login')
	}

	return (
		<>
			<section className='bg-green-700'>
				<Container>
					<div className='flex flex-col p-10'>
						<h1 className='text-center text-3xl font-bold mb-3'>
							{store.user.name}
						</h1>
						<h2 className=' text-center text-white mb-3'>{store.user.email}</h2>
						{!store.user.isActivated && <p>Подтвердите аккаунт</p>}
						<button
							className='text-red-500 m-auto bg-white rounded-sm px-2 py-1 hover:text-white hover:bg-red-500'
							onClick={deleteAccount}
						>
							Delete account
						</button>
					</div>
				</Container>
			</section>
			<section>
				<Container>
					<div className='flex flex-col p-10'>
						<h1 className='text-3xl font-bold mb-3'>Заметки</h1>
						<ul className='list-disc px-10'>
							<li>Выводить роли пользователя</li>
							<li>
								Сделать функционал позволяющий задавать админу роли для других
								пользователей
							</li>
						</ul>
					</div>
				</Container>
			</section>
		</>
	)
}

export default observer(Profile)
