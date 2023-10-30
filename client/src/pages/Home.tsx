import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import Container from '../layouts/Container'

const Home: FC = () => {
	return (
		<div className='flex flex-col'>
			<section className='bg-green-700 p-10 '>
				<Container>
					<h1 className='text-white text-4xl font-extrabold mb-5 p-0'>
						Илья Чураков
					</h1>
					<h2 className='text-black text-4xl font-extrabold'>
						портфолио <br /> <span className=' text-gray-700'>front-end</span>
						<br />
						разработчика
					</h2>
				</Container>
			</section>
			<section className='bg-gray-700 p-5'>
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
		</div>
	)
}

export default observer(Home)
