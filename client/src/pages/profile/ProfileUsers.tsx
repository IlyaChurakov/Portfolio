import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect } from 'react'
import { GoCheckCircleFill, GoX, GoXCircleFill } from 'react-icons/go'
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
			<table className='w-full bg-white '>
				<thead>
					<tr className='border-none h-10'>
						<th className='border-none font-normal bg-[#393D61] text-white'>
							Id
						</th>
						<th className='border-none font-normal bg-[#6767AA] text-white'>
							Email
						</th>
						<th className='border-none font-normal bg-[#A9A9CC]'>Name</th>
						<th className='border-none font-normal bg-[#F2E0D0]'>
							isActivated
						</th>
						<th className='border-none font-normal bg-[#D6A47C]'>Roles</th>
						<th className='border-none font-normal bg-[#B88156] text-white'>
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{store.userList?.map(item => {
						return (
							<tr
								key={item.id}
								className='border-b border-dotted border-gray-300'
							>
								<td className='h-5 text-center font-bold'>{item.id}</td>
								<td className='h-5 text-center'>{item.email}</td>
								<td className='h-5 text-center'>{item.name}</td>
								<td className='h-5 '>
									{item.isActivated ? (
										<GoCheckCircleFill fill='green' className='m-auto' />
									) : (
										<GoXCircleFill fill='red' className='m-auto' />
									)}
								</td>
								<td className='h-5 text-center'>
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
								<td className='h-5 text-center'>
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
