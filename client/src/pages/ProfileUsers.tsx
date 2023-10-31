import { FC, useContext } from 'react'
import { Context } from '../main'
import useDeleteUser from './useDeleteUser'
import useProfileUsers from './useProfileUsers'

const ProfileUsers: FC = () => {
	const { store } = useContext(Context)
	const { data, refetch } = useProfileUsers()
	const { mutate } = useDeleteUser(refetch)

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
