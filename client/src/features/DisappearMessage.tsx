import { ReactNode, useEffect, useState } from 'react'

const DisappearMessage = ({
	children,
	trigger,
	timeout = 3000,
}: {
	children: ReactNode
	trigger: boolean
	timeout?: number
}) => {
	const [isVisible, setIsVisible] = useState<boolean>(false)

	useEffect(() => {
		let timer: number | undefined

		if (trigger) {
			setIsVisible(true)

			timer = setTimeout(() => {
				setIsVisible(false)
			}, timeout)
		}

		return () => {
			if (timer) clearTimeout(timer)
		}
	}, [trigger])

	return <>{isVisible && children}</>
}

export default DisappearMessage
