import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import ProfileUserForm from '../../widgets/forms/ProfileUserForm'

const ProfilePerson: FC = observer(() => {
	return (
		<div className='flex flex-col p-10'>
			<ProfileUserForm />
		</div>
	)
})

export default ProfilePerson
