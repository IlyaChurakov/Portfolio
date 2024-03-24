import ChangePasswordForm from '@widgets/forms/ChangePasswordForm'
import RequestRestoringAccessForm from '@widgets/forms/RequestRestoringAccessForm'
import { useLocation } from 'react-router-dom'

const RestoringAccess = () => {
	const { pathname } = useLocation()

	return (
		<div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-96'>
			{pathname === '/restore-access' ? (
				<RequestRestoringAccessForm />
			) : (
				<ChangePasswordForm />
			)}
		</div>
	)
}

export default RestoringAccess
