import { FC, useContext } from 'react'
import { GoArrowLeft, GoPerson } from 'react-icons/go'
import { IoLogOutOutline } from 'react-icons/io5'
import { useLocation, useNavigate } from 'react-router-dom'
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
		<div className=' absolute top-0 w-full px-5 flex justify-between h-10 items-center'>
			{pathname !== '/profile' && (
				<GoPerson
					className='text-xl cursor-pointer'
					onClick={() => navigate('/profile')}
				/>
			)}

			{pathname !== '/' && (
				<GoArrowLeft
					className=' text-xl cursor-pointer'
					onClick={() => navigate('/')}
				/>
			)}

			<IoLogOutOutline
				className=' text-xl cursor-pointer'
				onClick={logoutHandler}
			/>
		</div>
	)
}

export default Header
