import classNames from 'classnames'
import { memo } from 'react'
import { Link } from 'react-router-dom'

const CustomLink = ({
	to = '#',
	text,
	position = 'none',
	className,
	color = '#9255E8',
}: {
	to: string
	text: string
	position?: 'left' | 'none' | 'right'
	className?: string
	color?: string
}) => {
	return (
		<Link
			to={to}
			style={{ float: position }}
			className={classNames(`inline-block hover:text-white`, color, className)}
		>
			{text}
		</Link>
	)
}

export default memo(CustomLink)
