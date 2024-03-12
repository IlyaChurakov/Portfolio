import React, { ComponentProps } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface TypeModalSelectProps extends ComponentProps<'select'> {
	values: string[]
	className: string
	register: UseFormRegisterReturn
}

const TypeModalSelect: React.FC<TypeModalSelectProps> = ({
	values,
	register,
	className,
	...props
}) => {
	return (
		<select
			className={`w-full h-[30px] rounded-sm border-[2px] border-violet focus:border-[#ae82ed] outline-none bg-[#3e3e3e] text-white ${className}`}
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
