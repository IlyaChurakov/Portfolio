import CustomLink from '@shared/ui/CustomLink'
import Title from '@shared/ui/Title'
import ProjectList from '@widgets/ProjectList'

const Projects = () => {
	return (
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
	)
}

export default Projects
