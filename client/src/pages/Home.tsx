import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Container from '../layouts/Container'
import { Context } from '../main'

const Home: FC = () => {
	const { projectStore } = useContext(Context)

	useEffect(() => {
		projectStore.getLastProjects(4)
	}, [])

	return (
		<div className='flex flex-col'>
			<section className='bg-gray-dark px-10 '>
				<Container>
					<div className='grid grid-cols-[1fr_0.8fr] items-center'>
						<div>
							<h1 className='text-white text-5xl font-extrabold mb-5 p-0'>
								Илья Чураков
							</h1>
							<h2 className='text-[#9255E8] text-3xl font-extrabold flex flex-col'>
								<span>Портфолио</span>
								<span className='my-1 text-4xl text-white'>front-end</span>
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

			<section className=' bg-gray-dark p-5'>
				<Container>
					<h1 className='text-white text-4xl font-extrabold mb-5 p-0'>
						Новости
					</h1>
					<div className='grid grid-cols-4 gap-5 justify-items-center'>
						<div className='h-40 w-full bg-gray flex justify-center items-center'>
							Новость 1
						</div>
						<div className='h-40 w-full bg-gray flex justify-center items-center'>
							Новость 2
						</div>
						<div className='h-40 w-full bg-gray flex justify-center items-center'>
							Новость 3
						</div>
						<div className='h-40 w-full bg-gray flex justify-center items-center'>
							Новость 4
						</div>
					</div>
				</Container>
			</section>
			<section className='p-5'>
				<Container>
					<h1 className='text-white text-4xl font-extrabold mb-5 p-0'>
						Проекты
					</h1>
					<div className='grid grid-cols-4 gap-5 justify-items-center'>
						{projectStore.lastProjects &&
							projectStore.lastProjects.map(project => (
								<Link
									to={`/projects/${project.id}`}
									className='w-full bg-gray aspect-square flex justify-center items-center'
								>
									{project.name}
								</Link>
							))}
					</div>
				</Container>
			</section>
		</div>
	)
}

export default observer(Home)
