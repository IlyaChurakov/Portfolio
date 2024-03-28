import CustomLink from '@shared/ui/CustomLink'
import ProjectList from '@widgets/ProjectList'
import Subtitle from '@widgets/blocks/Subtitle'
import Title from '@widgets/blocks/Title'
import ContactForm from '@widgets/forms/ContactForm'
import { observer } from 'mobx-react-lite'
import Container from '../shared/layouts/Container'
import styles from './home.module.css'

const Home = () => {
	return (
		<Container>
			<section>
				<div className='grid grid-cols-[1fr_0.8fr] items-center'>
					<div>
						<Title text='Илья Чураков' />
						<Subtitle text='Портфолио' color='#9255E8' />
						<Subtitle text='front-end' />
						<Subtitle text='разработчика' color='#9255E8' />
					</div>

					<div className='min-h-[600px] aspect-square relative'>
						<div className={styles.background} />
						<img
							src='me.png'
							alt='me'
							className='h-full absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-1/2 z-20'
						/>
					</div>
				</div>
			</section>

			<section>
				<Title text='Проекты' />
				<ProjectList count={4} />
				<CustomLink
					to='/projects'
					text='Смотреть все'
					position='right'
					className='my-5'
					color='text-gray'
				/>
			</section>

			<section>
				<Title text='Связаться со мной' />
				<ContactForm />
			</section>
		</Container>
	)
}

export default observer(Home)
