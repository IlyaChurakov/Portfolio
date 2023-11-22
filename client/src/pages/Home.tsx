import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import Container from '../layouts/Container'

const Home: FC = () => {
	return (
		<div className='flex flex-col'>
			<section className='bg-[rgb(35,36,38)] px-10 '>
				<Container>
					<div className='grid grid-cols-[1fr_0.8fr] items-center'>
						<div>
							<h1 className='text-white text-5xl font-extrabold mb-5 p-0'>
								Илья Чураков
							</h1>
							<h2 className='text-[#9255E8] text-3xl font-extrabold flex flex-col'>
								<span>Портфолио</span>
								<span className='my-1 text-4xl text-gray-300'>front-end</span>
								<span>разработчика</span>
							</h2>
						</div>

						<div className='h-[600px] aspect-square relative'>
							<div
								className='absolute w-full h-full'
								style={{
									backgroundImage:
										'linear-gradient( -45deg, #bd34fe 50%, #47caff 50% )',
									filter: 'blur(72px)',
								}}
							></div>
							<img
								src='me.png'
								alt='me'
								className='h-full absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-1/2 z-20'
							/>
						</div>
					</div>
				</Container>
			</section>

			<section className=' bg-[#DDDDDD] p-5'>
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
			</section>
		</div>
	)
}

export default observer(Home)
