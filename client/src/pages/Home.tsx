import ProjectList from '@widgets/ProjectList'
import ContactForm from '@widgets/forms/ContactForm'
import { observer } from 'mobx-react-lite'
import { Link } from 'react-router-dom'
import Container from '../shared/layouts/Container'

// TODO: раскидать на компоненты

const Home = () => {
	return (
		<Container>
			<section className='bg-gray-dark px-10 '>
				<div className='grid grid-cols-[1fr_0.8fr] items-center '>
					<div>
						<h1 className='text-white inline-block text-5xl font-extrabold mb-5 p-0'>
							Илья Чураков
						</h1>
						<br />
						<h2 className='text-[#9255E8] text-3xl font-extrabold '>
							<span>Портфолио</span>
							<br />
							<span className='my-1 text-4xl text-white'>front-end</span>
							<br />
							<span>разработчика</span>
						</h2>
					</div>

					<div className='min-h-[600px] aspect-square relative'>
						<div
							className='absolute w-full h-full'
							style={{
								backgroundImage:
									'linear-gradient( -45deg, #bd34fe 50%, #47caff 50% )',
								filter: 'blur(72px)',
							}}
						></div>
						<img
							src='MeArtShadow.png'
							alt='me'
							className='pt-20 h-full absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-1/2 z-20'
						/>
					</div>
				</div>
			</section>

			<section className='p-5'>
				<h1 className='text-white text-4xl font-extrabold mb-5 p-0'>Проекты</h1>
				<ProjectList count={4} />

				<div className='mt-5 text-violet flex justify-end'>
					<Link to='/projects'>Смотреть все</Link>
				</div>
			</section>

			<section>
				<ContactForm />
			</section>
		</Container>
	)
}

export default observer(Home)
