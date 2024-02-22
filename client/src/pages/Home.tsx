import { useStores } from '@app/provider'
import { RootStore } from '@app/provider/store/rootStore'
import { RootStoreContext } from '@app/provider/store/store'
import { observer } from 'mobx-react-lite'
import { FC, useEffect } from 'react'
import Container from '../shared/layouts/Container'
import ProjectItem from '../shared/ui/ProjectItem'

const Home: FC = observer(() => {
	const { getLastProjects, lastProjects } = useStores(
		RootStoreContext,
		(contextData: RootStore) => contextData,
		(store: RootStore) => store.projectStore
	)

	useEffect(() => {
		getLastProjects(4)
	}, [])

	return (
		<Container>
			<div className='flex flex-col'>
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
								src='me.png'
								alt='me'
								className='h-full absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-1/2 z-20'
							/>
						</div>
					</div>
				</section>

				<section className='p-5'>
					<h1 className='text-white text-4xl font-extrabold mb-5 p-0'>
						Проекты
					</h1>
					<div className='grid grid-cols-4 gap-5 justify-items-center'>
						{lastProjects?.map(project => (
							<ProjectItem key={project.id} project={project} />
						))}
					</div>
				</section>
			</div>
		</Container>
	)
})

export default Home
