import { Link } from 'react-router-dom'

const CustomLink = ({
	to = '#',
	text,
	position = 'none',
	className,
}: {
	to: string
	text: string
	position?: 'left' | 'none' | 'right'
	className?: string
}) => {
	return (
		<Link
			to={to}
			className={`inline-block text-violet hover:text-white my-5 ${className}`}
			style={{ float: position }}
		>
			{text}
		</Link>
	)
}

export default CustomLink
