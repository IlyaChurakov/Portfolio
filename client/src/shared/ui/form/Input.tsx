import { InputHTMLAttributes, memo, ReactNode } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	isEdit: boolean
	type: string
	register: UseFormRegisterReturn
	children?: ReactNode
}

const Input = ({ isEdit, type, register, children, ...props }: InputProps) => {
	return (
		<>
			{isEdit ? (
				<input
					{...props}
					type={type}
					{...register}
					className='mb-3 rounded-sm p-1'
				/>
			) : (
				children
			)}
		</>
	)
}

export default memo(Input)
