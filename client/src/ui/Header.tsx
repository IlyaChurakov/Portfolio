import { FC, useContext } from 'react'
import { GoArrowLeft, GoPerson } from 'react-icons/go'
import { MdLogout } from 'react-icons/md'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
		<header className='bg-[#DDDDDD]'>
			<Container>
				<div className='w-full flex justify-between h-10 items-center'>
					{pathname.indexOf('profile') == -1 &&
						(!store.isAuth ? (
							<Link to='/login' className='#595961'>
								Sign in
							</Link>
						) : (
							<GoPerson
								className='text-xl cursor-pointer'
								onClick={() => navigate('/profile')}
								fill='#595961'
							/>
						))}

					{pathname !== '/' && (
						<GoArrowLeft
							className=' text-xl cursor-pointer'
							onClick={() => navigate('/')}
							fill='#595961'
						/>
					)}

					<MdLogout
						className=' text-xl cursor-pointer'
						onClick={logoutHandler}
						fill='#595961'
					/>
				</div>
			</Container>
		</header>
	)
}

export default Header
