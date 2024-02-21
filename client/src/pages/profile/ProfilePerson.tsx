import { useStores } from '@app/provider'
import { RootStore } from '@app/provider/store/rootStore'
import { RootStoreContext } from '@app/provider/store/store'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'
import { IoMdCreate } from 'react-icons/io'
import { MdAlternateEmail, MdPublishedWithChanges } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { transformDate } from '../../shared/utils/utils'
import Avatar from './components/Avatar'
import Description from './components/Description'

export const ProfilePerson: FC = observer(() => {
	const { deleteAccount, user, changeDescription } = useStores(
		RootStoreContext,
		(contextData: RootStore) => contextData,
		(store: RootStore) => {
			return {
				...store.userStore,
				...store.authStore,
			}
		}
	)

	const navigate = useNavigate()

	async function deleteAccountWithConfirm() {
		const agree = confirm('Вы действительно хотите удалить свой аккаунт?')
		if (agree) {
			await deleteAccount(user.id)
			navigate('/login')
		}
	}

	const handleDescriptionEdit = (editedDescription: string) => {
		if (editedDescription !== user.description) {
			changeDescription(user.id, editedDescription)
		}
	}

	return (
		<div className='flex flex-col p-10'>
			<div
				className='w-full bg-black p-5 grid grid-cols-[10rem_1fr] gap-10 rounded-[10px]'
				style={{
					boxShadow: '0px 3px 42px -3px rgba(255, 255, 255, 0.1)',
				}}
			>
				<div className='relative w-40 max-h-60'>
					<Avatar />
				</div>

				<div>
					<h1 className='text-start text-3xl text-white font-bold mb-3'>
						{user.name}
					</h1>
					<div>
						<Description
							description={user.description}
							onEdit={handleDescriptionEdit}
						/>
					</div>

					<p className='flex items-center text-start text-violet mb-3'>
						<MdAlternateEmail title='Email' className='mr-2' />
						{user.email}
					</p>
					<p className='flex items-center text-start text-violet mb-3'>
						<MdPublishedWithChanges title='Дата регистрации' className='mr-2' />
						{transformDate(user.createdAt)}
					</p>
					<p className='flex items-center text-start text-violet mb-3'>
						<IoMdCreate
							title='Дата последнего изменения профиля'
							className='mr-2'
						/>
						{transformDate(user.updatedAt)}
					</p>
					{!user.isActivated && (
						<p className='text-start mb-3 text-white'>Подтвердите аккаунт</p>
					)}

					<button
						className='text-white m-auto bg-red rounded-sm px-2 py-1'
						onClick={deleteAccountWithConfirm}
					>
						Delete account
					</button>
				</div>
			</div>
		</div>
	)
})
