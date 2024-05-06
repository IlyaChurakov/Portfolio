import { useStores } from '@app/index'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { FaBookBookmark, FaGithub, FaTelegram } from 'react-icons/fa6'
import { FiLogOut } from 'react-icons/fi'
import { IoClose, IoMenu } from 'react-icons/io5'
import { SlLayers } from 'react-icons/sl'
import { TbHome } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'

const Menu = () => {
	const { authStore } = useStores()
	const navigate = useNavigate()

	const [isVisible, setIsVisible] = useState<boolean>(false)

	const openMenu = () => setIsVisible(true)
	const closeMenu = () => setIsVisible(false)

	async function logoutHandler() {
		await authStore.logout()
		navigate('/login')
	}

	const linkClassNames = `flex items-center my-2 text-gray hover:text-white cursor-pointer ${
		!isVisible && 'justify-center'
	}`

	return (
		<nav
			className={`bg-[#171717] transition-all duration-50 ${
				isVisible ? 'w-[300px]' : 'w-[60px]'
			} h-full fixed top-0 left-0 z-50 grid grid-rows-[70px_1fr_70px] `}
		>
			<div
				className={`flex ${
					isVisible ? 'justify-end pt-5 px-5' : 'justify-center pt-5'
				} w-full text-gray`}
			>
				{isVisible ? (
					<IoClose
						className='text-2xl hover:text-white cursor-pointer'
						onClick={closeMenu}
					/>
				) : (
					<IoMenu
						className='text-2xl hover:text-white cursor-pointer'
						onClick={openMenu}
					/>
				)}
			</div>

			<div
				className={`flex flex-col w-full  ${
					isVisible ? 'px-12 items-start' : 'items-center'
				} `}
			>
				<Link
					to={authStore.isUserLogged ? '/profile' : '/login'}
					onClick={closeMenu}
					className={linkClassNames}
				>
					<AiOutlineUser className='text-xl' />
					{authStore.isUserLogged ? (
						<LinkText isVisible={isVisible} text='Профиль' />
					) : (
						<LinkText isVisible={isVisible} text='Войти' />
					)}
				</Link>

				<Link to='/' onClick={closeMenu} className={linkClassNames}>
					<TbHome className='text-xl' />
					<LinkText isVisible={isVisible} text='Главная' />
				</Link>

				<Link to={'/projects'} onClick={closeMenu} className={linkClassNames}>
					<SlLayers className='text-xl' />
					<LinkText isVisible={isVisible} text='Проекты' />
				</Link>

				<Link to={'/skills'} onClick={closeMenu} className={linkClassNames}>
					<FaBookBookmark className='text-xl' />
					<LinkText isVisible={isVisible} text='Стек' />
				</Link>

				{authStore.isUserLogged && (
					<div onClick={logoutHandler} className={linkClassNames}>
						<FiLogOut className='text-xl' />
						<LinkText isVisible={isVisible} text='Выйти' />
					</div>
				)}
			</div>

			<div
				className={`text-gray flex items-center ${
					isVisible ? 'justify-center px-12' : 'flex-col justify-center pb-5'
				}`}
			>
				<Link to={'https://github.com/IlyaChurakov'}>
					<FaGithub
						className={`hover:text-white text-2xl cursor-pointer ${
							isVisible ? 'mr-5' : 'mb-2'
						}`}
					/>
				</Link>
				<Link to={'https://t.me/ilyachurakov18'}>
					<FaTelegram className='hover:text-white text-2xl cursor-pointer' />
				</Link>
			</div>
		</nav>
	)
}

function LinkText({ text, isVisible }: { text: string; isVisible: boolean }) {
	if (!isVisible) return
	return <span className='text-sm ml-5'>{text}</span>
}

export default observer(Menu)
