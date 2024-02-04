import { ColorTypes } from '@app/provider/store/types/project.types'
import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface ColorModalSelectProps {
	textColor: ColorTypes
	values: string[]
	register: UseFormRegisterReturn
}

const ColorModalSelect: React.FC<ColorModalSelectProps> = ({
	textColor,
	values,
	register,
}) => {
	return (
		<select
			className='w-full bg-white h-[30px] rounded-sm outline-none'
			style={{ color: textColor }}
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
