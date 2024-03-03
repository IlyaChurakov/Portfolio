import { memo, ReactNode } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

const Textarea = ({
	isEdit,
	register,
	children,
}: {
	isEdit: boolean
	register: UseFormRegisterReturn
	children?: ReactNode
}) => {
	return (
		<>
			{isEdit ? (
				<textarea {...register} className='mb-3 rounded-sm p-1' />
			) : (
				children
			)}
		</>
	)
}

export default memo(Textarea)
