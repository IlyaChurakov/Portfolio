import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import ProfileUserForm from '../widgets/forms/ProfileUserForm'
import styles from './profilePerson.module.css'

const ProfilePerson: FC = observer(() => {
	return (
		<div className='flex flex-col p-10'>
			<div className={styles.wrapper}>
				<ProfileUserForm />
			</div>
		</div>
	)
})

export default ProfilePerson
