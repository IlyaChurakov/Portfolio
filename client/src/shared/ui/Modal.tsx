import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import { ReactNode } from 'react'
import styles from './modal.module.css'

const Modal = ({
	isOpen,
	children,
}: {
	isOpen: boolean
	children: ReactNode
}) => {
	if (!isOpen) return

	return (
		<div
			className={classNames(
				'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black rounded-lg shadow-xl p-5 z-50',
				styles.wrapper
			)}
		>
			{children}
		</div>
	)
}

export default observer(Modal)
