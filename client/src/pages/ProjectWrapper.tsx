import Header from '@widgets/Header'
import { Outlet } from 'react-router-dom'

const ProjectWrapper = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}

export default ProjectWrapper
