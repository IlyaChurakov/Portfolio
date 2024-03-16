import React, { ComponentProps } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface SelectProps extends ComponentProps<'select'> {
	values: string[]
	className?: string
	register: UseFormRegisterReturn
}

const Select: React.FC<SelectProps> = ({
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
					<option value={value} key={value} className='text-white'>
						{value}
					</option>
				)
			})}
		</select>
	)
}

export default Select
