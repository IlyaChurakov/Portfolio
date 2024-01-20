import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface ColorModalSelectProps {
	values: string[]
	register: UseFormRegisterReturn
}

const ColorModalSelect: React.FC<ColorModalSelectProps> = ({
	values,
	register,
}) => {
	return (
		<select
			className='w-full border-b-2 border-white bg-transparent text-white outline-none'
			{...register}
		>
			{values.map(value => {
				return (
					<option value={value} key={value} style={{ color: value }}>
						{value}
					</option>
				)
			})}
		</select>
	)
}

export default ColorModalSelect
