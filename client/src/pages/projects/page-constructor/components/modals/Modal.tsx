import { ReactNode } from 'react'

const Modal = ({
	children,
	isOpen,
}: {
	children: ReactNode
	isOpen: boolean
}) => {
	return (
		<div
			className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black rounded-lg`}
			style={{ display: isOpen ? 'block' : 'none' }}
		>
			{children}
		</div>
	)
}

export default Modal
