import { useStores } from '@app/index'
import { IUser } from '@app/store/authStore/auth.types'
import { appRoles } from '@shared/config/router/router.config'
import Loader from '@shared/ui/Loader'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { GoCheckCircleFill, GoXCircleFill } from 'react-icons/go'
import UserService from '../services/User.service'

const ProfileUsers = () => {
	const { userStore } = useStores()

	const [users, setUsers] = useState<IUser[]>()

	useEffect(() => {
		fetchUsers()
	}, [])

	async function fetchUsers() {
		const users = await UserService.getUsersList()
		setUsers(users)
	}

	async function changeUserRole(id: string, role: number) {
		const updatedUser = await UserService.changeUserRole(id, role)
		const updatedUsers = users?.map(user =>
			user.id === updatedUser.id ? updatedUser : user
		)
		setUsers(updatedUsers)
	}

	async function deleteUser(user: IUser) {
		if (confirm(`Удалить пользователя ${user.email}`)) {
			await UserService.deleteAccount(user.id)
			await fetchUsers()
		}
	}

	const names: string[] = [
		'Id',
		'Email',
		'Имя',
		'Активация аккаунта',
		'Роли',
		'Действия',
	]

	if (!users) return <Loader />

	if (!users.length) return <div>Пользователей нет</div>

	return (
		<div className='p-5'>
			<table
				className='w-full bg-black text-white rounded-lg'
				style={{
					boxShadow: '0px 3px 42px -3px rgba(255, 255, 255, 0.1)',
					borderRadius: '0 0 10px 10px ',
				}}
			>
				<thead>
					<tr className='border-none h-10'>
						{names.map((text, index) => (
							<th
								key={text}
								className={`border-none bg-violet font-normal text-white`}
								style={{
									borderRadius:
										index == 0
											? '10px 0 0 0'
											: index == names.length - 1
											? '0 10px 0 0'
											: '',
								}}
							>
								{text}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{users.map(item => (
						<tr
							key={item.id}
							className='border-b border-dotted border-gray-300 last:border-none'
						>
							<td className='h-5 text-center'>{item.id}</td>
							<td className='h-5 text-center'>{item.email}</td>
							<td className='h-5 text-center'>{item.name}</td>
							<td className='h-5 text-center'>
								{item.isActivated ? (
									<GoCheckCircleFill className='m-auto text-green' />
								) : (
									<GoXCircleFill className='text-red m-auto' />
								)}
							</td>
							<td className='h-5 text-center'>
								<Select
									value={item.role}
									onChange={async e =>
										await changeUserRole(item.id, parseInt(e.target.value))
									}
								/>
							</td>
							<td className='h-5 text-center'>
								{item.id !== userStore.user.id ? (
									<button onClick={() => deleteUser(item)} className='text-red'>
										Delete
									</button>
								) : (
									<div className='text-green'>Вы</div>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

function Select({
	value,
	onChange,
}: {
	value: number
	onChange: React.ChangeEventHandler<HTMLSelectElement>
}) {
	const roles = Object.keys(appRoles)

	return (
		<select value={value} onChange={onChange} className='text-gray'>
			{roles.map(role => (
				<option
					key={role}
					value={appRoles[role as keyof typeof appRoles]}
					className={
						appRoles[role as keyof typeof appRoles] === value
							? 'bg-red text-white'
							: 'text-gray'
					}
				>
					{role}
				</option>
			))}
		</select>
	)
}

export default observer(ProfileUsers)
