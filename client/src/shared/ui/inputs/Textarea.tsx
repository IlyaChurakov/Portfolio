import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface TypeModalSelectProps {
	defaultValue: string | undefined
	register: UseFormRegisterReturn
}

const Textarea: React.FC<TypeModalSelectProps> = ({
	defaultValue,
	register,
}) => {
	return (
		<textarea
			defaultValue={defaultValue}
			className='w-full bg-white rounded-sm outline-none p-2'
			{...register}
		/>
	)
}

export default Textarea
