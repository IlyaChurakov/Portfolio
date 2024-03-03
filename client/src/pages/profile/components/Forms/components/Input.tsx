import { memo, ReactNode } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

const Input = ({
	isEdit,
	type,
	register,
	children,
}: {
	isEdit: boolean
	type: string
	register: UseFormRegisterReturn
	children?: ReactNode
}) => {
	return (
		<>
			{isEdit ? (
				<input type={type} {...register} className='mb-3 rounded-sm p-1' />
			) : (
				children
			)}
		</>
	)
}

export default memo(Input)
