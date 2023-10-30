import { FC, useContext } from 'react'
import { GoArrowLeft, GoPerson } from 'react-icons/go'
import { MdLogout } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import Container from '../layouts/Container'
import { Context } from '../main'

const Header: FC = () => {
	const { store } = useContext(Context)
	const navigate = useNavigate()
	const { pathname } = useLocation()

	async function logoutHandler() {
		await store.logout()
		navigate('/login')
	}

	return (
		<header className='bg-gray-600'>
			<Container>
				<div className='w-full flex justify-between h-10 items-center'>
					{pathname !== '/profile' && (
						<GoPerson
							className='text-xl cursor-pointer'
							onClick={() => navigate('/profile')}
							fill='#fff'
						/>
					)}

					{pathname !== '/' && (
						<GoArrowLeft
							className=' text-xl cursor-pointer'
							onClick={() => navigate('/')}
							fill='#fff'
						/>
					)}

					<MdLogout
						className=' text-xl cursor-pointer'
						onClick={logoutHandler}
						fill='#fff'
					/>
				</div>
			</Container>
		</header>
	)
}

export default Header
