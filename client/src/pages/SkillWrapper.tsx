import Header from '@widgets/Header'
import { Outlet } from 'react-router-dom'

const SkillWrapper = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}

export default SkillWrapper
