import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
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
				</Container>
			</section>
			<section className='bg-gray-500'>
				<Container>
					<Link to={'/profile'} className='mx-5 text-white'>
						Profile
					</Link>
					<Link to={'users'} className='mx-5 text-white'>
						Users
					</Link>
				</Container>
			</section>
			<section>
				<Container>
					<Outlet />
				</Container>
			</section>
		</>
	)
}

export default observer(Profile)
