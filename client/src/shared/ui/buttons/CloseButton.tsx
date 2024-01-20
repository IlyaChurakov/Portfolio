import React, { ReactEventHandler } from 'react'
import { IoIosClose } from 'react-icons/io'

interface CloseButtonProps {
	onClick: ReactEventHandler
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick }) => {
	return (
		<button onClick={onClick} className='text-white absolute top-2 right-2'>
			<IoIosClose fill='#fff' className='text-3xl' />
		</button>
	)
}

export default CloseButton
