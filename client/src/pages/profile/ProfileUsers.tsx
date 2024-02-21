import { RootStore } from '@app/provider/store/rootStore'
import { RootStoreContext, useStores } from '@app/provider/store/store'
import { observer } from 'mobx-react-lite'
import { FC, useEffect } from 'react'
import { GoCheckCircleFill, GoX, GoXCircleFill } from 'react-icons/go'
import Menu from './components/menu/Menu'

export const ProfileUsers: FC = observer(() => {
	const { getUserList, userList, removeRoleById, user, deleteAccount } =
		useStores(
			RootStoreContext,
			(contextData: RootStore) => contextData,
			(store: RootStore) => {
				return {
					...store.userStore,
					...store.authStore,
				}
			}
		)

	useEffect(() => {
		getUserList()
	}, [])

	const roles = ['admin', 'user', 'developer']

	const names: string[] = [
		'Id',
		'Email',
		'Имя',
		'Активация аккаунта',
		'Роли',
		'Действия',
	]

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
					{userList.map(item => {
						console.log('render')
						return (
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
									{item.roles.map(role => {
										return (
											<div
												key={role}
												className='grid grid-cols-[1fr_25px] justify-items-center bg-white m-2 rounded-sm hover:bg-gray-300 text-black'
											>
												<div>{role}</div>
												<button onClick={() => removeRoleById(item.id, role)}>
													<GoX className='text-red' />
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
									{+item.id !== +user.id ? (
										<button
											onClick={() => {
												if (confirm(`Удалить пользователя ${item.email}`)) {
													deleteAccount(item.id)
												}
											}}
											className='text-red'
										>
											Delete
										</button>
									) : (
										<div className='text-green'>Вы</div>
									)}
								</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
})
