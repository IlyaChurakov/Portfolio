import { observer } from 'mobx-react-lite'
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
		<header className='bg-[#D6A47C]'>
			<Container>
				<div className='w-full flex justify-between h-10 items-center px-5'>
					{pathname.indexOf('profile') == -1 &&
						(!store.isAuth ? (
							<Link to='/login' className='#595961'>
								Sign in
							</Link>
						) : (
							pathname.indexOf('projects') == -1 && (
								<GoPerson
									className='text-xl cursor-pointer'
									onClick={() => navigate('/profile')}
									fill='#595961'
								/>
							)
						))}

					{pathname !== '/' && (
						<GoArrowLeft
							className=' text-xl cursor-pointer'
							onClick={() => {
								console.log(pathname)
								if (pathname.includes('edit')) {
									navigate(pathname.split('/edit')[0])
								}
								if (
									pathname == '/projects' ||
									pathname == '/profile' ||
									pathname == '/profile/users'
								) {
									navigate('/')
								}
								if (pathname.includes('/projects/')) {
									navigate('/projects')
								}
							}}
							fill='#595961'
						/>
					)}

					{store.isAuth && pathname.includes('profile') && (
						<MdLogout
							className=' text-xl cursor-pointer'
							onClick={logoutHandler}
							fill='#595961'
						/>
					)}
				</div>
			</Container>
		</header>
	)
}

export default observer(Header)
