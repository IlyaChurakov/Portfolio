import { useOnClickOutside } from '@shared/hooks/useOnClickOutside.ts'
import List from './List.js'

const Menu = ({ id, roles }: { id: string; roles: string[] }) => {
	const { isShow, ref, setIsShow } = useOnClickOutside(false)

	return (
		<div className='w-full ' ref={ref}>
			{roles.length ? (
				<button onClick={() => setIsShow(!isShow)} className='text-gray'>
					{isShow ? 'Закрыть' : 'Сменить роль'}
				</button>
			) : null}

			<List id={id} isShow={isShow} roles={roles} />
		</div>
	)
}

export default Menu
