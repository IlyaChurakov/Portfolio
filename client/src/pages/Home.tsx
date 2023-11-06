import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import Container from '../layouts/Container'

const Home: FC = () => {
	return (
		<div className='flex flex-col'>
			<section className='bg-[#595961] py-2 px-5'>
				<Container>
					<Link
						to={'/profile'}
						className='mr-5 text-[#A7ACB0]  hover:text-white'
					>
						Профиль
					</Link>
					<Link
						to={'/projects'}
						className='mr-5 text-[#A7ACB0]  hover:text-white'
					>
						Проекты
					</Link>
				</Container>
			</section>
			<section className='bg-[#595961] p-10 '>
				<Container>
					<h1 className='text-white text-4xl font-extrabold mb-5 p-0'>
						Илья Чураков
					</h1>
					<h2 className='text-[#D6A47C] text-xl font-extrabold'>
						Портфолио <span className='text-2xl text-gray-300'>front-end</span>{' '}
						разработчика
					</h2>
				</Container>
			</section>

			{/* <section className=' bg-[#DDDDDD] p-5'>
				<Container>
					<h1 className='text-white text-4xl font-extrabold mb-5 p-0'>
						Новости
					</h1>
					<div className='flex align-middle overflow-hidden'>
						<div className='h-40 w-96 bg-white mr-4'></div>
						<div className='h-40 w-96 bg-white mr-4'></div>
						<div className='h-40 w-96 bg-white mr-4'></div>
						<div className='h-40 w-96 bg-white mr-4'></div>
						<div className='h-40 w-96 bg-white mr-4'></div>
						<div className='h-40 w-96 bg-white mr-4'></div>
						<div className='h-40 w-96 bg-white mr-4'></div>
						<div className='h-40 w-96 bg-white'></div>
					</div>
				</Container>
			</section>
			<section className='p-5'>
				<Container>
					<h1 className='text-black text-4xl font-extrabold mb-5 p-0'>
						Проекты
					</h1>
					<div className='grid grid-cols-4 gap-5 justify-items-center'>
						<div className='h-48 w-48 bg-gray-100'></div>
						<div className='h-48 w-48 bg-gray-100'></div>
						<div className='h-48 w-48 bg-gray-100'></div>
						<div className='h-48 w-48 bg-gray-100'></div>
						<div className='h-48 w-48 bg-gray-100'></div>
						<div className='h-48 w-48 bg-gray-100'></div>
						<div className='h-48 w-48 bg-gray-100'></div>
						<div className='h-48 w-48 bg-gray-100'></div>
					</div>
				</Container>
			</section> */}
		</div>
	)
}

export default observer(Home)
