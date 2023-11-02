import { useContext } from 'react'
import { GoPlus } from 'react-icons/go'
import { Context } from '../../../main'

interface IList {
	id: number
	isShow: boolean
	roles: string[]
}

const List = ({ id, isShow, roles }: IList) => {
	const { store } = useContext(Context)

	if (!isShow) return null

	return (
		<nav className='bg-gray-100 absolute w-full  shadow-xl  z-10 border-none'>
			<ul>
				{roles.map(role => (
					<li key={role}>
						<div className='px-5 grid grid-cols-[1fr_20px] justify-items-center items-center hover:bg-gray-200 '>
							<div>{role}</div>
							<GoPlus
								fill='green'
								className='text-lg cursor-pointer '
								onClick={() => store.addRoleById(id, role)}
							/>
						</div>
					</li>
				))}
			</ul>
		</nav>
	)
}

export default List
