import Centered from '@shared/ui/Centered'
import ChangePasswordForm from '@widgets/forms/ChangePasswordForm'
import RequestRestoringAccessForm from '@widgets/forms/RequestRestoringAccessForm'
import { useLocation } from 'react-router-dom'

const RestoringAccess = () => {
	const { pathname } = useLocation()

	return (
		<Centered>
			{pathname === '/restore-access' ? (
				<RequestRestoringAccessForm />
			) : (
				<ChangePasswordForm />
			)}
		</Centered>
	)
}

export default RestoringAccess
