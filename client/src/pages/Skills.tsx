import Container from '@shared/layouts/Container'
import ProjectList from '@widgets/ProjectList'

const type = 'Навык'

const Skills = () => {
	return (
		<section>
			<Container>
				<ProjectList type={type} />
			</Container>
		</section>
	)
}

export default Skills
