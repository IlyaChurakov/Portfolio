import React, { ComponentProps } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface TypeModalSelectProps extends ComponentProps<'select'> {
	values: string[]
	register: UseFormRegisterReturn
}

const TypeModalSelect: React.FC<TypeModalSelectProps> = ({
	values,
	register,
	...props
}) => {
	return (
		<select
			className='w-full bg-white h-[30px] rounded-sm outline-none'
			{...register}
			{...props}
		>
			{values.map(value => {
				return (
					<option value={value} key={value} className='text-black'>
						{value}
					</option>
				)
			})}
		</select>
	)
}

export default TypeModalSelect
