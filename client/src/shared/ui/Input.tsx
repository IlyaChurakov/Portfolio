import { InputHTMLAttributes, memo, ReactNode } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	isEdit: boolean
	type: string
	register: UseFormRegisterReturn
	children?: ReactNode
}

const Input = ({
	isEdit,
	type,
	register,
	children,
	className,
	...props
}: InputProps) => {
	return (
		<>
			{isEdit ? (
				<input
					{...props}
					type={type}
					{...register}
					className={`block rounded-sm py-1 px-2 border-[2px] border-violet focus:border-[#ae82ed] outline-0 bg-[#3e3e3e] text-white ${className}`}
				/>
			) : (
				children
			)}
		</>
	)
}

export default memo(Input)
