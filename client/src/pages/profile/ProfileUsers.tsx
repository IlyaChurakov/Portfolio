import { useMutation } from '@tanstack/react-query'
import { FC, useContext } from 'react'
import { Context } from '../../main'
import UserService from '../../services/User.service'
import useDeleteUser from './hooks/useDeleteUser'
import useProfileUsers from './hooks/useProfileUsers'

const ProfileUsers: FC = () => {
	const { store } = useContext(Context)
	const { data, refetch } = useProfileUsers()
	const { mutate } = useDeleteUser(refetch)

	const { mutate: addRole } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (arg: { id: number; role: string }) =>
			UserService.addRole(arg).then(() => refetch()),
	})

	const { mutate: deleteRole } = useMutation({
		mutationKey: ['delete user'],
		mutationFn: (arg: { id: number; role: string }) =>
			UserService.deleteRole(arg).then(() => refetch()),
	})

	return (
		<div className='p-5'>
			<table className='w-full'>
				<thead>
					<tr>
						<th className='h-5 border-solid border-2 border-gray-300'>Id</th>
						<th className='h-5 border-solid border-2 border-gray-300'>Email</th>
						<th className='h-5 border-solid border-2 border-gray-300'>Name</th>
						<th className='h-5 border-solid border-2 border-gray-300'>
							isActivated
						</th>
						<th className='h-5 border-solid border-2 border-gray-300'>Roles</th>
					</tr>
				</thead>
				<tbody>
					{data?.map(item => {
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
											<div key={role}>
												{role}{' '}
												<button
													className='text-red-500'
													onClick={() =>
														deleteRole({ id: +item.id, role: role })
													}
												>
													delete
												</button>
											</div>
										)
									})}
									<button
										onClick={() => {
											const result = prompt('Введите роль', 'admin')
											if (result && !item.roles.includes(result)) {
												addRole({ id: +item.id, role: result })
											}
										}}
										className='text-green-500'
									>
										add role
									</button>
								</td>
								<td className='h-5 border-solid border-2 border-gray-300 text-center'>
									{+item.id !== +store.user.id ? (
										<button
											onClick={() => {
												if (confirm(`Удалить пользователя ${item.email}`)) {
													mutate(+item.id)
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

export default ProfileUsers
