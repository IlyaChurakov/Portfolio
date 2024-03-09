import { InputHTMLAttributes, memo, MouseEventHandler } from 'react'
import ReactLoading from 'react-loading'

interface IButtonProps extends InputHTMLAttributes<HTMLButtonElement> {
	text: string
	isLoading?: boolean
	loadingColor?: string
	type?: 'button' | 'submit' | 'reset'
	onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button = ({
	text,
	isLoading,
	loadingColor = '#9255E8',
	type = 'button',
	onClick,
	className,
	...props
}: IButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={`text-violet flex justify-center items-center ${className}`}
			{...props}
		>
			{isLoading ? (
				<ReactLoading type='spin' width={15} height={15} color={loadingColor} />
			) : (
				text
			)}
		</button>
	)
}

export default memo(Button)
