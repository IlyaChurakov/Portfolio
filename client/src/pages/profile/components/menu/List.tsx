import { useStores } from '@app/provider'
import { RootStore } from '@app/provider/store/rootStore'
import { RootStoreContext } from '@app/provider/store/store'
import { GoPlus } from 'react-icons/go'

interface IList {
	id: string
	isShow: boolean
	roles: string[]
}

const List = ({ id, isShow, roles }: IList) => {
	const { addRoleById } = useStores(
		RootStoreContext,
		(contextData: RootStore) => contextData,
		(store: RootStore) => store.userStore
	)

	if (!isShow) return null

	return (
		<nav className='bg-white absolute w-full text-black  shadow-xl  z-10 border-none'>
			<ul>
				{roles.map(role => (
					<li key={role}>
						<div className='px-5 grid grid-cols-[1fr_20px] justify-items-center items-center hover:bg-gray '>
							<div>{role}</div>
							<GoPlus
								fill='green'
								className='text-lg cursor-pointer '
								onClick={() => addRoleById(id, role)}
							/>
						</div>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default List
