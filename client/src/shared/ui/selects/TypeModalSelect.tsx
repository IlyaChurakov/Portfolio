import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface TypeModalSelectProps {
	values: string[]
	register: UseFormRegisterReturn
}

const TypeModalSelect: React.FC<TypeModalSelectProps> = ({
	values,
	register,
}) => {
	return (
		<select
			className='w-full bg-white h-[30px] rounded-sm outline-none'
			{...register}
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
