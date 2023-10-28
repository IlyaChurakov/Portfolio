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
		<div>
			{pathname !== '/profile' && (
				<GoPerson onClick={() => navigate('/profile')} />
			)}

			<GoArrowLeft onClick={() => navigate('/')} />
			<IoLogOutOutline onClick={logoutHandler} />
		</div>
	)
}

export default Header
