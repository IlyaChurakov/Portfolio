import { memo, ReactNode, TextareaHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	isEdit: boolean
	register: UseFormRegisterReturn
	className?: string
	children?: ReactNode
}

const Textarea = ({
	isEdit,
	register,
	children,
	className,
	...props
}: ITextareaProps) => {
	return (
		<>
			{isEdit ? (
				<textarea
					{...register}
					{...props}
					className={`mb-3 rounded-sm py-1 px-2 border-[1px] border-violet bg-[#3e3e3e] text-white focus:border-[#ae82ed] outline-none ${className}`}
				/>
			) : (
				children
			)}
		</>
	)
}

export default memo(Textarea)
