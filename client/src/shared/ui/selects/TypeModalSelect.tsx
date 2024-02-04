import { BlockTypes } from '@app/provider/store/types/project.types'
import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface TypeModalSelectProps {
	defaultValue: BlockTypes
	values: string[]
	register: UseFormRegisterReturn
}

const TypeModalSelect: React.FC<TypeModalSelectProps> = ({
	defaultValue,
	values,
	register,
}) => {
	return (
		<select
			defaultValue={defaultValue}
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
