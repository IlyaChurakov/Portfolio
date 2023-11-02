import { useOnClickOutside } from './useOnClickOutside.js'

import List from './List.js'

interface IMenu {
	id: number
	roles: string[]
}

const Menu = ({ id, roles }: IMenu) => {
	const { isShow, ref, setIsShow } = useOnClickOutside(false)

	return (
		<div className='w-full ' ref={ref}>
			{roles.length ? (
				<button onClick={() => setIsShow(!isShow)} className='text-gray-400'>
					{isShow ? 'Закрыть' : 'Добавить роль'}
				</button>
			) : null}

			<List id={id} isShow={isShow} roles={roles} />
		</div>
	)
}

export default Menu