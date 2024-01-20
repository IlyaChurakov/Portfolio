import React from 'react'

interface AcceptButtonProps {
	type: 'button' | 'submit' | 'reset' | undefined
}

const AcceptButton: React.FC<AcceptButtonProps> = ({ type }) => {
	return (
		<button
			type={type}
			className='w-24 h-full text-white border-2 border-white ml-auto'
		>
			Ок
		</button>
	)
}

export default AcceptButton
