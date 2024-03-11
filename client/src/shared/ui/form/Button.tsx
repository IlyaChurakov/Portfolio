import { InputHTMLAttributes } from 'react'
import ReactLoading from 'react-loading'

type variants = 'contained' | 'text' | 'contained-danger' | 'text-danger'

interface IButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
	children: string
	isLoading?: boolean
	width?: string
	height?: string
	loadingColor?: string
	variant?: variants
	className?: string
	type?: 'button' | 'submit' | 'reset'
}

const variants: Record<variants, string> = {
	contained: 'bg-violet text-white',
	text: 'text-violet bg-none',
	'contained-danger': 'bg-red text-white',
	'text-danger': 'text-red bg-none',
}

const Button = ({
	isLoading,
	width,
	height,
	type = 'button',
	variant = 'text',
	loadingColor = '#9255E8',
	children,
	className,
	...props
}: IButtonProps) => {
	return (
		<button
			type={type}
			className={`${variants[variant]} flex justify-center items-center  rounded-lg hover:opacity-75 ${className}`}
			style={{ width, height }}
			{...props}
		>
			{isLoading ? (
				<ReactLoading type='spin' width={15} height={15} color={loadingColor} />
			) : (
				children
			)}
		</button>
	)
}

export default Button
