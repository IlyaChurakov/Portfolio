import { useStores } from '@app/index'
import { observer } from 'mobx-react-lite'
import { GoPlus } from 'react-icons/go'

interface IList {
	id: string
	isShow: boolean
	roles: string[]
}

const List = ({ id, isShow, roles }: IList) => {
	const { userStore } = useStores()

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
								onClick={() => userStore.addRoleById(id, role)}
							/>
						</div>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default observer(List)
