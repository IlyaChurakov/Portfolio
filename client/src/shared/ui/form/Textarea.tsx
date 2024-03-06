import { memo, ReactNode, TextareaHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface ITextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	isEdit: boolean
	register: UseFormRegisterReturn
	children?: ReactNode
}

const Textarea = ({ isEdit, register, children, ...props }: ITextareaProps) => {
	return (
		<>
			{isEdit ? (
				<textarea {...register} {...props} className='mb-3 rounded-sm p-1' />
			) : (
				children
			)}
		</>
	)
}

export default memo(Textarea)
