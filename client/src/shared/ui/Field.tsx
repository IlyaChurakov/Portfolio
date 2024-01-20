import { memo } from 'react'

interface IFieldProps {
	register: Function
	name: string
	options: object
	error: string | undefined
}

const Field = ({ register, name, options, error, ...rest }: IFieldProps) => {
	return (
		<div className='w-full'>
			<input
				{...register(name, options)}
				{...rest}
				className='w-full mb-5 bg-transparent border-b-[1px] border-[#D6A47C] p-1 outline-0 text-[#D6A47C] placeholder:text-gray-300'
			/>
			{error && <div className='text-red-500'>{error}</div>}
		</div>
	)
}

export default memo(Field)
