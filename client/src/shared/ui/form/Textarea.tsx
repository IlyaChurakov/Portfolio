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
					className={`mb-3 rounded-sm p-1 ${className}`}
				/>
			) : (
				children
			)}
		</>
	)
}

export default memo(Textarea)
