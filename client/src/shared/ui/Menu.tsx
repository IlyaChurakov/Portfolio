import { useStores } from '@app/provider'
import { RootStore } from '@app/provider/store/rootStore'
import { RootStoreContext } from '@app/provider/store/store'
import { observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { AiOutlineUser } from 'react-icons/ai'
import { FaGithub, FaTelegram } from 'react-icons/fa6'
import { FiLogOut } from 'react-icons/fi'
import { IoClose, IoMenu } from 'react-icons/io5'
import { SlLayers } from 'react-icons/sl'
import { TbHome } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'

const Menu: FC = () => {
	const { isAuth, logout } = useStores(
		RootStoreContext,
		(contextData: RootStore) => contextData,
		(store: RootStore) => store.authStore
	)
	const navigate = useNavigate()

	const [isVisible, setIsVisible] = useState<boolean>(false)

	const openMenu = () => {
		setIsVisible(true)
	}

	const closeMenu = () => {
		setIsVisible(false)
	}

	async function logoutHandler() {
		await logout()
		navigate('/login')
	}

	return (
		<nav
			className={`bg-[#171717] transition-all duration-50 ${
				isVisible ? 'w-[300px]' : 'w-[60px]'
			} h-full fixed top-0 left-0 z-50 grid grid-rows-[70px_1fr_70px] `}
		>
			<div
				className={`flex ${
					isVisible ? 'justify-end pt-5 px-5' : 'justify-center pt-5'
				} w-full text-[#6F7680]`}
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
					to={isAuth ? '/profile' : '/login'}
					onClick={closeMenu}
					className={`flex items-center my-2 text-[#6F7680] hover:text-white cursor-pointer ${
						!isVisible && 'justify-center'
					}`}
				>
					<AiOutlineUser className='text-xl' />
					{isVisible && (
						<span className='text-sm ml-5'>{isAuth ? 'Профиль' : 'Войти'}</span>
					)}
				</Link>

				<Link
					to='/'
					onClick={closeMenu}
					className={`flex items-center my-2 text-[#6F7680] hover:text-white cursor-pointer ${
						!isVisible && 'justify-center'
					}`}
				>
					<TbHome className='text-xl' />
					{isVisible && <span className='text-sm ml-5'>Главная</span>}
				</Link>

				<Link
					to={'/projects'}
					onClick={closeMenu}
					className={`flex items-center my-2 text-[#6F7680] hover:text-white cursor-pointer ${
						!isVisible && 'justify-center'
					}`}
				>
					<SlLayers className='text-xl' />
					{isVisible && <span className='text-sm ml-5'>Проекты</span>}
				</Link>

				{isAuth && (
					<div
						onClick={() => {
							logoutHandler()
						}}
						className={`flex items-center my-2 text-[#6F7680] hover:text-white cursor-pointer ${
							!isVisible && 'justify-center'
						}`}
					>
						<FiLogOut className='text-xl' />
						{isVisible && <span className='text-sm ml-5'>Выйти</span>}
					</div>
				)}
			</div>

			<div
				className={`text-[#6F7680] flex items-center ${
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

export default observer(Menu)
