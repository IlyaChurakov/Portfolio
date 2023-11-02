import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect } from 'react'
import { GoX } from 'react-icons/go'
import { Context } from '../../main'
import Menu from './menu/Menu'

const ProfileUsers: FC = () => {
	const { store } = useContext(Context)

	useEffect(() => {
		store.getUserList()
	}, [])

	const roles = ['admin', 'user', 'developer']

	return (
		<div className='p-5'>
			<table className='w-full bg-white'>
				<thead>
					<tr>
						<th className='h-5 border-solid border-2 border-gray-300'>Id</th>
						<th className='h-5 border-solid border-2 border-gray-300'>Email</th>
						<th className='h-5 border-solid border-2 border-gray-300'>Name</th>
						<th className='h-5 border-solid border-2 border-gray-300'>
							isActivated
						</th>
						<th className='h-5 border-solid border-2 border-gray-300'>Roles</th>
						<th className='h-5 border-solid border-2 border-gray-300'></th>
					</tr>
				</thead>
				<tbody>
					{store.userList?.map(item => {
						return (
							<tr key={item.id}>
								<td className='h-5 border-solid border-2 border-gray-300 text-center'>
									{item.id}
								</td>
								<td className='h-5 border-solid border-2 border-gray-300 text-center'>
									{item.email}
								</td>
								<td className='h-5 border-solid border-2 border-gray-300 text-center'>
									{item.name}
								</td>
								<td className='h-5 border-solid border-2 border-gray-300 text-center'>
									{item.isActivated ? 'true' : 'false'}
								</td>
								<td className='h-5 border-solid border-2 border-gray-300 text-center'>
									{item.roles.map(role => {
										return (
											<div
												key={role}
												className='grid grid-cols-[1fr_25px] justify-items-center bg-gray-200 m-2 rounded-sm hover:bg-gray-300'
											>
												<div>{role}</div>
												<button
													onClick={() => store.removeRoleById(+item.id, role)}
												>
													<GoX fill='red' />
												</button>
											</div>
										)
									})}
									<div className='w-full grid justify-items-end relative'>
										<Menu
											roles={roles.filter(role => {
												if (!item.roles.includes(role)) {
													return role
												}
											})}
											id={+item.id}
										/>
									</div>
								</td>
								<td className='h-5 border-solid border-2 border-gray-300 text-center'>
									{+item.id !== +store.user.id ? (
										<button
											onClick={() => {
												if (confirm(`Удалить пользователя ${item.email}`)) {
													store.deleteAccount(+item.id)
												}
											}}
											className='text-red-500'
										>
											Delete
										</button>
									) : (
										<div className='text-green-500'>Текущий</div>
									)}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}

export default observer(ProfileUsers)
