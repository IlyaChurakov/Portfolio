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
			className='w-full h-[30px] rounded-sm border-[2px] border-violet focus:border-[#ae82ed] outline-0 bg-[#3e3e3e] text-white'
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
