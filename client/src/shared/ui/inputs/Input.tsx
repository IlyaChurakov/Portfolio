import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps {
	defaultValue: string | undefined
	register: UseFormRegisterReturn
	placeholder: string
}

const Input: React.FC<InputProps> = ({
	defaultValue,
	register,
	placeholder,
}) => {
	return (
		<input
			defaultValue={defaultValue ?? ''}
			className='w-full border-b-2 border-white bg-transparent text-white outline-none'
			placeholder={placeholder}
			{...register}
		/>
	)
}

export default Input
