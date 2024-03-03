import { memo, MouseEventHandler } from 'react'
import ReactLoading from 'react-loading'

const Button = ({
	text,
	isLoading,
	type = 'button',
	onClick,
}: {
	text: string
	isLoading?: boolean
	type?: 'button' | 'submit' | 'reset'
	onClick?: MouseEventHandler<HTMLButtonElement>
}) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className='text-violet flex justify-center items-center'
		>
			{isLoading ? (
				<ReactLoading type='spin' width={15} height={15} color='#9255E8' />
			) : (
				text
			)}
		</button>
	)
}

export default memo(Button)
