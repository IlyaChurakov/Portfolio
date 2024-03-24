import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'

const Modal = ({
	isOpen,
	children,
}: {
	isOpen: boolean
	children: ReactNode
}) => {
	if (!isOpen) return

	return (
		<div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black rounded-lg shadow-xl p-5 z-50'>
			{children}
		</div>
	)
}

export default observer(Modal)
